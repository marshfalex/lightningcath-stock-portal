'use client';

import { useState, useMemo, useEffect } from 'react';
import { stockList as defaultStockList, productCategories, StockItem, ProductCategory } from '@/data/stockList';
import { loadFromLocalStorage } from '@/lib/stockUtils';

interface StockListProps {
  onMaterialSelect?: (material: StockItem) => void;
  selectedMaterials?: StockItem[];
}

export default function StockList({ onMaterialSelect, selectedMaterials = [] }: StockListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFamily, setFilterFamily] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<ProductCategory | ''>('');
  const [stockList, setStockList] = useState<StockItem[]>(defaultStockList);
  const [isUsingLiveData, setIsUsingLiveData] = useState(false);

  // Function to load stock data
  const loadStockData = () => {
    const saved = loadFromLocalStorage();
    if (saved && saved.length > 0) {
      setStockList(saved);
      setIsUsingLiveData(true);
    } else {
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
  }, [searchTerm, filterFamily, filterCategory]);

  const isSelected = (material: StockItem) => {
    return selectedMaterials.some(
      selected => selected.id === material.id
    );
  };

  const getQuantityBadge = (quantity: number | string) => {
    if (quantity === "Coming Soon!") {
      return <span className="badge" style={{ background: '#fef3c7', color: '#92400e' }}>Coming Soon!</span>;
    }
    const numQty = typeof quantity === 'number' ? quantity : parseInt(quantity as string);
    if (numQty === 0) {
      return <span className="badge" style={{ background: '#fee2e2', color: '#991b1b' }}>Out of Stock</span>;
    }
    if (numQty < 50) {
      return <span className="badge" style={{ background: '#fed7aa', color: '#9a3412' }}>Low Stock ({numQty})</span>;
    }
    return <span className="badge badge-success">In Stock ({numQty})</span>;
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ marginBottom: 0 }}>Stock List</h2>
        {isUsingLiveData && (
          <span style={{
            fontSize: '0.75rem',
            color: '#10b981',
            background: '#d1fae5',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontWeight: '500'
          }}>
            ✓ Live Updates
          </span>
        )}
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

      <div style={{ marginTop: '1rem', marginBottom: '1rem', color: '#6b7280' }}>
        Showing {filteredStock.length} of {stockList.length} items
      </div>

      <div style={{ overflowX: 'auto' }}>
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
                  <td style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.id}</td>
                  <td>
                    <span className="badge badge-primary">{item.category}</span>
                  </td>
                  <td style={{ fontSize: '0.875rem' }}>{item.materialFamily}</td>
                  <td>{item.description}</td>
                  <td>{getQuantityBadge(item.quantity)}</td>
                  {onMaterialSelect && (
                    <td>
                      {isSelected(item) ? (
                        <span className="badge badge-success">Selected</span>
                      ) : (
                        <button
                          className="button"
                          onClick={() => onMaterialSelect(item)}
                          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        >
                          Select
                        </button>
                      )}
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

