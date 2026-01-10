'use client';

import { useState, useMemo, useEffect } from 'react';
import { stockList as defaultStockList, productCategories, StockItem, ProductCategory } from '@/data/stockList';
import { loadFromLocalStorage } from '@/lib/stockUtils';

interface StockListProps {
  onMaterialSelect?: (material: StockItem) => void;
  selectedMaterials?: StockItem[];
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

export default function StockList({ onMaterialSelect, selectedMaterials = [], onSelectAll, onDeselectAll }: StockListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFamily, setFilterFamily] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<ProductCategory | ''>('');
  const [stockList, setStockList] = useState<StockItem[]>(defaultStockList);
  const [isUsingLiveData, setIsUsingLiveData] = useState(false);

  // Function to load stock data
  const loadStockData = () => {
    try {
      console.log('[StockList] Loading stock data from localStorage...');
      const saved = loadFromLocalStorage();
      console.log('[StockList] Loaded data:', saved ? `${saved.length} items` : 'null');

      if (saved && saved.length > 0) {
        console.log('[StockList] Using saved data');
        setStockList(saved);
        setIsUsingLiveData(true);
      } else {
        console.log('[StockList] Using default stock list');
        setStockList(defaultStockList);
        setIsUsingLiveData(false);
      }
    } catch (error) {
      console.error('[StockList] Error loading data:', error);
      setStockList(defaultStockList);
      setIsUsingLiveData(false);
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    loadStockData();
  }, []);

  // Reload data when page becomes visible (user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadStockData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', loadStockData);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', loadStockData);
    };
  }, []);

  // Calculate material families dynamically from current stock
  const materialFamilies = useMemo(() => {
    return Array.from(new Set(stockList.map(item => item.materialFamily))).sort();
  }, [stockList]);

  const filteredStock = useMemo(() => {
    return stockList.filter(item => {
      const matchesSearch =
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.materialFamily.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFamily = !filterFamily || item.materialFamily === filterFamily;
      const matchesCategory = !filterCategory || item.category === filterCategory;

      return matchesSearch && matchesFamily && matchesCategory;
    });
  }, [searchTerm, filterFamily, filterCategory, stockList]);

  const isSelected = (material: StockItem) => {
    return selectedMaterials.some(
      selected => selected.id === material.id
    );
  };

  const getQuantityBadge = (quantity: number | string) => {
    if (quantity === "Coming Soon!") {
      return <span className="badge badge-warning">Coming Soon!</span>;
    }
    const numQty = typeof quantity === 'number' ? quantity : parseInt(quantity as string);
    if (numQty === 0) {
      return <span className="badge badge-error">Out of Stock</span>;
    }
    if (numQty < 50) {
      return <span className="badge badge-warning">Low Stock ({numQty})</span>;
    }
    return <span className="badge badge-success">In Stock ({numQty})</span>;
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="card-title" style={{ marginBottom: 0 }}>Stock List</h2>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {isUsingLiveData && (
            <span className="badge badge-success">
              ✓ Live Updates
            </span>
          )}
          <button
            className="button button-ghost"
            onClick={loadStockData}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by product ID, material, description, or notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as ProductCategory | '')}
        >
          <option value="">All Categories</option>
          {productCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={filterFamily}
          onChange={(e) => setFilterFamily(e.target.value)}
        >
          <option value="">All Material Families</option>
          {materialFamilies.map(family => (
            <option key={family} value={family}>{family}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
          Showing {filteredStock.length} of {stockList.length} items
        </span>
        {onMaterialSelect && filteredStock.length > 0 && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className="button button-ghost"
              onClick={() => {
                filteredStock.forEach(item => {
                  if (!isSelected(item)) {
                    onMaterialSelect(item);
                  }
                });
              }}
            >
              ✓ Select All ({filteredStock.length})
            </button>
            <button
              className="button button-ghost"
              onClick={() => {
                filteredStock.forEach(item => {
                  if (isSelected(item)) {
                    onMaterialSelect(item);
                  }
                });
              }}
              disabled={selectedMaterials.length === 0}
            >
              ✕ Deselect All
            </button>
          </div>
        )}
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Material Family</th>
              <th>Description</th>
              <th>Quantity</th>
              {onMaterialSelect && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredStock.length === 0 ? (
              <tr>
                <td colSpan={onMaterialSelect ? 6 : 5} style={{ textAlign: 'center', padding: '2rem' }}>
                  No materials found matching your search criteria.
                </td>
              </tr>
            ) : (
              filteredStock.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{item.id}</td>
                  <td>
                    <span className="badge badge-info">{item.category}</span>
                  </td>
                  <td style={{ fontSize: '0.875rem' }}>{item.materialFamily}</td>
                  <td>{item.description}</td>
                  <td>{getQuantityBadge(item.quantity)}</td>
                  {onMaterialSelect && (
                    <td>
                      <button
                        className={isSelected(item) ? 'button button-secondary' : 'button'}
                        onClick={() => onMaterialSelect(item)}
                        style={{ minWidth: '100px' }}
                      >
                        {isSelected(item) ? '✕ Remove' : '+ Add'}
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

