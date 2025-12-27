'use client';

import { useState } from 'react';
import StockList from './components/StockList';
import LeadTimeCalculator from './components/LeadTimeCalculator';
import RFQForm from './components/RFQForm';
import { StockItem } from '@/data/stockList';

export default function Home() {
  const [selectedMaterials, setSelectedMaterials] = useState<StockItem[]>([]);

  const handleMaterialSelect = (material: StockItem) => {
    setSelectedMaterials(prev => {
      // Check if already selected
      const isAlreadySelected = prev.some(item => item.id === material.id);

      if (isAlreadySelected) {
        // Remove if already selected
        return prev.filter(item => item.id !== material.id);
      } else {
        // Add if not selected
        return [...prev, material];
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedMaterials([]);
  };

  return (
    <main>
      <div className="header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>LightningCath Stock List & Lead Time Portal</h1>
              <p>Search inventory, estimate delivery times, and request quotes for medical device manufacturing</p>
            </div>
            <a
              href="/admin"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'white',
                color: '#1e3a8a',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.875rem'
              }}
            >
              Admin Panel →
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <StockList 
            onMaterialSelect={handleMaterialSelect}
            selectedMaterials={selectedMaterials}
          />
        </div>

        {selectedMaterials.length > 0 && (
          <div style={{ 
            background: '#eff6ff', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            border: '1px solid #bfdbfe'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{selectedMaterials.length} material(s) selected</strong>
                <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  Selected materials will be included in your RFQ
                </p>
              </div>
              <button 
                className="button button-secondary" 
                onClick={handleClearSelection}
                style={{ padding: '0.5rem 1rem' }}
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-2">
          <div>
            <LeadTimeCalculator />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <RFQForm selectedMaterials={selectedMaterials} />
        </div>

        <div style={{ 
          marginTop: '3rem', 
          padding: '2rem', 
          background: '#f9fafb', 
          borderRadius: '8px',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Questions about our stock or services?</strong>
          </p>
          <p>
            Contact us: <a href="mailto:amy.oneil@lightningcath.com" style={{ color: '#3b82f6' }}>
              amy.oneil@lightningcath.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

