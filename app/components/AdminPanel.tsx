'use client';

import { useState } from 'react';
import { stockList as initialStockList, StockItem, ProductCategory, productCategories } from '@/data/stockList';

export default function AdminPanel() {
  const [stockItems, setStockItems] = useState<StockItem[]>(initialStockList);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Partial<StockItem>>({
    id: '',
    category: 'Resin',
    materialFamily: '',
    description: '',
    notes: '',
    quantity: 0
  });

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
      alert('Please fill in required fields (ID and Description)');
      return;
    }

    if (isAdding) {
      // Check if ID already exists
      if (stockItems.some(item => item.id === formData.id)) {
        alert('An item with this ID already exists');
        return;
      }
      setStockItems([...stockItems, formData as StockItem]);
    } else if (editingItem) {
      setStockItems(stockItems.map(item =>
        item.id === editingItem.id ? (formData as StockItem) : item
      ));
    }

    // Reset form
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

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setStockItems(stockItems.filter(item => item.id !== id));
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

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(stockItems, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lightningcath-stock-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Admin Panel - Stock Management</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="button" onClick={handleAdd}>
            + Add New Item
          </button>
          <button className="button button-secondary" onClick={handleExportJSON}>
            Export JSON
          </button>
        </div>
      </div>

      <div className="search-bar" style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by ID, description, or material family..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '1rem', color: '#6b7280' }}>
        Total Items: {stockItems.length} | Showing: {filteredItems.length}
      </div>

      {(isAdding || editingItem) && (
        <div style={{
          background: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '2px solid #3b82f6'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>
            {isAdding ? 'Add New Item' : `Edit Item: ${editingItem?.id}`}
          </h3>

          <div className="grid grid-2">
            <div className="input-group">
              <label>ID *</label>
              <input
                type="text"
                value={formData.id || ''}
                onChange={(e) => handleInputChange('id', e.target.value)}
                disabled={!isAdding}
                placeholder="e.g., resin-001"
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

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button className="button" onClick={handleSave}>
              Save
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Material Family</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Actions</th>
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
                <tr key={item.id} style={{ background: editingItem?.id === item.id ? '#eff6ff' : undefined }}>
                  <td style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.id}</td>
                  <td>
                    <span className="badge badge-primary">{item.category}</span>
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
                        setStockItems(stockItems.map(i =>
                          i.id === item.id ? { ...i, quantity: newQty } : i
                        ));
                      }}
                      style={{
                        width: '100px',
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }}
                    />
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="button"
                        onClick={() => handleEdit(item)}
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                      >
                        Edit
                      </button>
                      <button
                        className="button"
                        onClick={() => handleDelete(item.id)}
                        style={{
                          padding: '0.25rem 0.75rem',
                          fontSize: '0.875rem',
                          background: '#dc2626'
                        }}
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

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#fef3c7',
        borderRadius: '8px',
        border: '1px solid #fbbf24'
      }}>
        <strong>Note:</strong> Changes made here are only stored in your browser session.
        To save permanently, export the JSON and update the stockList.ts file in the codebase.
      </div>
    </div>
  );
}
