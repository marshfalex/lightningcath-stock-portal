'use client';

import { useState, useEffect, useRef } from 'react';
import { stockList as initialStockList, StockItem, ProductCategory, productCategories } from '@/data/stockList';
import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage, hasLocalStorageData, downloadCSV, parseCSV } from '@/lib/stockUtils';
import Notification, { NotificationType } from './Notification';

interface NotificationState {
  message: string;
  type: NotificationType;
}

export default function AdminPanel() {
  // Initialize from localStorage or fallback to default
  const [stockItems, setStockItems] = useState<StockItem[]>(() => {
    const saved = loadFromLocalStorage();
    return saved && saved.length > 0 ? saved : initialStockList;
  });
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [undoStack, setUndoStack] = useState<StockItem[][]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasLoadedInitialData = useRef(false);

  const [formData, setFormData] = useState<Partial<StockItem>>({
    id: '',
    category: 'Resin',
    materialFamily: '',
    description: '',
    notes: '',
    quantity: 0
  });

  // Show notification on first mount if data was loaded
  useEffect(() => {
    if (hasLocalStorageData() && !hasLoadedInitialData.current) {
      showNotification('Loaded saved inventory data from browser storage', 'info');
      hasLoadedInitialData.current = true;
    }
  }, []);

  // Auto-save to localStorage whenever stockItems changes (after initial load)
  useEffect(() => {
    if (hasLoadedInitialData.current && stockItems.length > 0) {
      try {
        saveToLocalStorage(stockItems);
      } catch (error: any) {
        showNotification(error.message || 'Failed to auto-save', 'error');
      }
    }
  }, [stockItems]);

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type });
  };

  const saveToUndoStack = () => {
    setUndoStack(prev => [...prev, stockItems].slice(-10)); // Keep last 10 states
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setStockItems(previousState);
      setUndoStack(prev => prev.slice(0, -1));
      showNotification('Undone last change', 'success');
    }
  };

  const filteredItems = stockItems.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.materialFamily.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: StockItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingItem(null);
    setFormData({
      id: '',
      category: 'Resin',
      materialFamily: '',
      description: '',
      notes: '',
      quantity: 0
    });
  };

  const handleSave = () => {
    if (!formData.id || !formData.description) {
      showNotification('Please fill in required fields (ID and Description)', 'error');
      return;
    }

    saveToUndoStack();

    if (isAdding) {
      if (stockItems.some(item => item.id === formData.id)) {
        showNotification('An item with this ID already exists', 'error');
        return;
      }
      setStockItems([...stockItems, formData as StockItem]);
      showNotification(`Added new item: ${formData.id}`, 'success');
    } else if (editingItem) {
      setStockItems(stockItems.map(item =>
        item.id === editingItem.id ? (formData as StockItem) : item
      ));
      showNotification(`Updated ${formData.id}`, 'success');
    }

    handleCancel();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      saveToUndoStack();
      setStockItems(stockItems.filter(item => item.id !== id));
      showNotification(`Deleted ${id}`, 'success');
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
    setFormData({
      id: '',
      category: 'Resin',
      materialFamily: '',
      description: '',
      notes: '',
      quantity: 0
    });
  };

  const handleInputChange = (field: keyof StockItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuantityUpdate = (itemId: string, newQuantity: number | string) => {
    setStockItems(stockItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(stockItems, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lightningcath-stock-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showNotification('JSON exported successfully', 'success');
  };

  const handleExportCSV = () => {
    downloadCSV(stockItems, `lightningcath-stock-${new Date().toISOString().split('T')[0]}.csv`);
    showNotification('CSV exported successfully', 'success');
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const importedItems = parseCSV(csvText);

        saveToUndoStack();

        // Merge or replace logic
        const existingIds = new Set(stockItems.map(item => item.id));
        const newItems = importedItems.filter(item => !existingIds.has(item.id));
        const updatedItems = stockItems.map(existing => {
          const imported = importedItems.find(imp => imp.id === existing.id);
          return imported || existing;
        });

        setStockItems([...updatedItems, ...newItems]);
        showNotification(`Imported ${importedItems.length} items from CSV`, 'success');
      } catch (error) {
        showNotification('Failed to import CSV. Please check the file format.', 'error');
      }
    };
    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset to default stock list? This will clear all your changes.')) {
      saveToUndoStack();
      setStockItems(initialStockList);
      clearLocalStorage();
      showNotification('Reset to default stock list', 'warning');
    }
  };

  const handlePrint = () => {
    window.print();
    showNotification('Opening print dialog...', 'info');
  };

  const getStockStats = () => {
    const total = stockItems.length;
    const inStock = stockItems.filter(item => typeof item.quantity === 'number' && item.quantity > 0).length;
    const lowStock = stockItems.filter(item => typeof item.quantity === 'number' && item.quantity > 0 && item.quantity < 50).length;
    const outOfStock = stockItems.filter(item => typeof item.quantity === 'number' && item.quantity === 0).length;
    const comingSoon = stockItems.filter(item => item.quantity === 'Coming Soon!').length;

    return { total, inStock, lowStock, outOfStock, comingSoon };
  };

  const stats = getStockStats();

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h2 className="card-title" style={{ marginBottom: '1rem' }}>Stock Management</h2>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-info">📦 Total: {stats.total}</span>
              <span className="badge badge-success">✅ In Stock: {stats.inStock}</span>
              <span className="badge badge-warning">⚠️ Low: {stats.lowStock}</span>
              <span className="badge badge-error">❌ Out: {stats.outOfStock}</span>
              <span className="badge badge-info">🔜 Coming: {stats.comingSoon}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="button" onClick={handleAdd}>
              + Add New
            </button>
            <button
              className="button button-ghost"
              onClick={handleUndo}
              disabled={undoStack.length === 0}
            >
              ↶ Undo
            </button>
            <button className="button button-ghost" onClick={handlePrint}>
              🖨️ Print
            </button>
          </div>
        </div>

        {/* Import/Export Section */}
        <div style={{
          background: 'var(--color-bg-secondary)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          border: '1px solid var(--color-border-subtle)'
        }}>
          <strong style={{ marginRight: '0.75rem', color: 'var(--color-text-primary)' }}>Import/Export:</strong>
          <button className="button button-ghost" onClick={handleExportCSV}>
            📊 Export CSV
          </button>
          <button className="button button-ghost" onClick={handleExportJSON}>
            📄 Export JSON
          </button>
          <label className="button button-ghost" style={{ cursor: 'pointer', margin: 0 }}>
            📥 Import CSV
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              style={{ display: 'none' }}
            />
          </label>
          <button
            className="button button-secondary"
            onClick={handleResetToDefaults}
            style={{ marginLeft: 'auto' }}
          >
            🔄 Reset to Defaults
          </button>
        </div>

        <div className="search-bar" style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search by ID, description, or material family..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            Showing {filteredItems.length} of {stockItems.length} items
          </span>
          {hasLocalStorageData() && (
            <span className="badge badge-success">
              ✓ Auto-saved to browser
            </span>
          )}
        </div>

        {(isAdding || editingItem) && (
          <div style={{
            background: 'var(--color-bg-secondary)',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '2px solid var(--color-primary)'
          }}>
            <h3 className="section-title">
              {isAdding ? 'Add New Item' : `Edit Item: ${editingItem?.id}`}
            </h3>

            <div className="grid grid-2">
              <div className="input-group">
                <label>ID * <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>(e.g., resin-037)</span></label>
                <input
                  type="text"
                  value={formData.id || ''}
                  onChange={(e) => handleInputChange('id', e.target.value)}
                  disabled={!isAdding}
                  placeholder="e.g., resin-037"
                />
              </div>

              <div className="input-group">
                <label>Category *</label>
                <select
                  value={formData.category || 'Resin'}
                  onChange={(e) => handleInputChange('category', e.target.value as ProductCategory)}
                >
                  {productCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Material Family *</label>
                <input
                  type="text"
                  value={formData.materialFamily || ''}
                  onChange={(e) => handleInputChange('materialFamily', e.target.value)}
                  placeholder="e.g., Pebax, Nylon, etc."
                />
              </div>

              <div className="input-group">
                <label>Quantity</label>
                <input
                  type="text"
                  value={formData.quantity?.toString() || '0'}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleInputChange('quantity', val === 'Coming Soon!' ? val : (isNaN(parseInt(val)) ? 0 : parseInt(val)));
                  }}
                  placeholder="Number or 'Coming Soon!'"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Description *</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={2}
                placeholder="Full product description"
              />
            </div>

            <div className="input-group">
              <label>Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={2}
                placeholder="Additional notes or comments"
              />
            </div>

            {/* Category-specific fields */}
            {formData.category === 'FEP Heat Shrink' && (
              <div className="grid grid-2">
                <div className="input-group">
                  <label>Exp ID (MIN)</label>
                  <input
                    type="text"
                    value={formData.expIdMin || ''}
                    onChange={(e) => handleInputChange('expIdMin', e.target.value)}
                    placeholder='e.g., 0.068"'
                  />
                </div>
                <div className="input-group">
                  <label>Rec ID (MAX)</label>
                  <input
                    type="text"
                    value={formData.recIdMax || ''}
                    onChange={(e) => handleInputChange('recIdMax', e.target.value)}
                    placeholder='e.g., 0.044"'
                  />
                </div>
                <div className="input-group">
                  <label>Rec Wall</label>
                  <input
                    type="text"
                    value={formData.recWall || ''}
                    onChange={(e) => handleInputChange('recWall', e.target.value)}
                    placeholder='e.g., 0.008"'
                  />
                </div>
                <div className="input-group">
                  <label>Shrink Ratio</label>
                  <input
                    type="text"
                    value={formData.shrinkRatio || ''}
                    onChange={(e) => handleInputChange('shrinkRatio', e.target.value)}
                    placeholder="e.g., 1.6:1"
                  />
                </div>
                <div className="input-group">
                  <label>Length</label>
                  <input
                    type="text"
                    value={formData.length || ''}
                    onChange={(e) => handleInputChange('length', e.target.value)}
                    placeholder='e.g., 72"'
                  />
                </div>
              </div>
            )}

            {formData.category === 'Single Lumen Extrusions' && (
              <div className="grid grid-2">
                <div className="input-group">
                  <label>Material</label>
                  <input
                    type="text"
                    value={formData.material || ''}
                    onChange={(e) => handleInputChange('material', e.target.value)}
                    placeholder="e.g., Pebax 72D Natural"
                  />
                </div>
                <div className="input-group">
                  <label>ID Spec</label>
                  <input
                    type="text"
                    value={formData.id_spec || ''}
                    onChange={(e) => handleInputChange('id_spec', e.target.value)}
                    placeholder='e.g., 0.086" ± .001"'
                  />
                </div>
                <div className="input-group">
                  <label>Wall Thickness (WT)</label>
                  <input
                    type="text"
                    value={formData.wt || ''}
                    onChange={(e) => handleInputChange('wt', e.target.value)}
                    placeholder='e.g., 0.005" ± .0005"'
                  />
                </div>
                <div className="input-group">
                  <label>OD (ref)</label>
                  <input
                    type="text"
                    value={formData.odRef || ''}
                    onChange={(e) => handleInputChange('odRef', e.target.value)}
                    placeholder='e.g., 0.096" (ref)'
                  />
                </div>
                <div className="input-group">
                  <label>Length</label>
                  <input
                    type="text"
                    value={formData.length || ''}
                    onChange={(e) => handleInputChange('length', e.target.value)}
                    placeholder='e.g., 66" + 1" - 0"'
                  />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
              <button className="button" onClick={handleSave}>
                ✓ Save
              </button>
              <button className="button button-ghost" onClick={handleCancel}>
                ✕ Cancel
              </button>
            </div>
          </div>
        )}

        <div className="table-container print-friendly">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Material Family</th>
                <th>Description</th>
                <th>Quantity</th>
                <th className="no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    No items found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} style={{ background: editingItem?.id === item.id ? 'var(--color-info-bg)' : undefined }}>
                    <td style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{item.id}</td>
                    <td>
                      <span className="badge badge-info">{item.category}</span>
                    </td>
                    <td style={{ fontSize: '0.875rem' }}>{item.materialFamily}</td>
                    <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.description}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = e.target.value;
                          const newQty = val === 'Coming Soon!' ? val : (isNaN(parseInt(val)) ? 0 : parseInt(val));
                          handleQuantityUpdate(item.id, newQty);
                        }}
                        style={{
                          width: '120px',
                          padding: '0.5rem',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          background: 'var(--color-bg-primary)',
                          color: 'var(--color-text-primary)'
                        }}
                        className="no-print-input"
                      />
                      <span className="print-only">{item.quantity}</span>
                    </td>
                    <td className="no-print">
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          className="button button-ghost"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="button button-secondary"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .header {
            background: white !important;
            color: black !important;
          }
          .no-print-input {
            border: none !important;
            padding: 0 !important;
          }
          .print-only {
            display: inline !important;
          }
        }
        .print-only {
          display: none;
        }
      `}</style>
    </>
  );
}
