'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { stockList as defaultStockList, productCategories, StockItem, ProductCategory } from '@/data/stockList';
import { loadFromLocalStorage } from '@/lib/stockUtils';
import StockListRow from './StockListRow';

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

  // Simple virtualization - only render visible rows
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const containerRef = useRef<HTMLDivElement>(null);
  const ROW_HEIGHT = 80;
  const BUFFER = 5;

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
    const end = Math.min(
      filteredStock.length,
      start + Math.ceil(containerRef.current.clientHeight / ROW_HEIGHT) + BUFFER * 2
    );
    setVisibleRange({ start, end });
  }, [filteredStock.length]);

  const visibleItems = useMemo(() => {
    return filteredStock.slice(visibleRange.start, visibleRange.end);
  }, [filteredStock, visibleRange]);

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
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-bg-input)',
          fontWeight: 600,
          fontSize: '0.75rem',
          color: 'var(--color-text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          <div style={{ flex: '0 0 120px', padding: '1rem 1.25rem' }}>ID</div>
          <div style={{ flex: '0 0 150px', padding: '1rem 1.25rem' }}>Category</div>
          <div style={{ flex: '0 0 200px', padding: '1rem 1.25rem' }}>Material Family</div>
          <div style={{ flex: '1 1 auto', padding: '1rem 1.25rem' }}>Description</div>
          <div style={{ flex: '0 0 180px', padding: '1rem 1.25rem' }}>Quantity</div>
          {onMaterialSelect && <div style={{ flex: '0 0 150px', padding: '1rem 1.25rem' }}>Action</div>}
        </div>

        {filteredStock.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'var(--color-text-secondary)',
            background: 'var(--color-bg-secondary)'
          }}>
            No materials found matching your search criteria.
          </div>
        ) : (
          <div
            ref={containerRef}
            onScroll={handleScroll}
            style={{
              height: Math.min(600, filteredStock.length * ROW_HEIGHT),
              overflow: 'auto',
              background: 'var(--color-bg-secondary)',
              position: 'relative'
            }}
          >
            <div style={{ height: filteredStock.length * ROW_HEIGHT, position: 'relative' }}>
              <div style={{ position: 'absolute', top: visibleRange.start * ROW_HEIGHT, left: 0, right: 0 }}>
                {visibleItems.map((item, idx) => (
                  <StockListRow
                    key={item.id}
                    item={item}
                    isSelected={isSelected(item)}
                    onSelect={onMaterialSelect}
                    style={{ height: ROW_HEIGHT }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

