'use client';

import { useState, useMemo } from 'react';
import { stockList, materialFamilies, StockItem } from '@/data/stockList';

interface StockListProps {
  onMaterialSelect?: (material: StockItem) => void;
  selectedMaterials?: StockItem[];
}

export default function StockList({ onMaterialSelect, selectedMaterials = [] }: StockListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFamily, setFilterFamily] = useState<string>('');

  const filteredStock = useMemo(() => {
    return stockList.filter(item => {
      const matchesSearch = 
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.materialFamily.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFamily = !filterFamily || item.materialFamily === filterFamily;
      
      return matchesSearch && matchesFamily;
    });
  }, [searchTerm, filterFamily]);

  const isSelected = (material: StockItem) => {
    return selectedMaterials.some(
      selected => selected.description === material.description && 
                  selected.materialFamily === material.materialFamily
    );
  };

  return (
    <div className="card">
      <h2>Stock List</h2>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by material, description, or notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-group">
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
              <th>Material Family</th>
              <th>Description</th>
              <th>Notes</th>
              {onMaterialSelect && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredStock.length === 0 ? (
              <tr>
                <td colSpan={onMaterialSelect ? 4 : 3} style={{ textAlign: 'center', padding: '2rem' }}>
                  No materials found matching your search criteria.
                </td>
              </tr>
            ) : (
              filteredStock.map((item, index) => (
                <tr key={index}>
                  <td>
                    <span className="badge badge-primary">{item.materialFamily}</span>
                  </td>
                  <td>{item.description}</td>
                  <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {item.notes || '-'}
                  </td>
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

