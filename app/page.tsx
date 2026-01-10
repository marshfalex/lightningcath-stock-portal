'use client';

import { useState } from 'react';
import StockList from './components/StockList';
import RFQForm from './components/RFQForm';
import { StockItem } from '@/data/stockList';
import { useTheme } from './context/ThemeContext';
import Image from 'next/image';

export default function Home() {
  const [selectedMaterials, setSelectedMaterials] = useState<StockItem[]>([]);
  const { theme, toggleTheme } = useTheme();

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
              <div style={{ position: 'relative', width: '180px', height: '60px' }}>
                <Image
                  src="/images/lightningcath-logo.png"
                  alt="LightningCath Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  onError={(e) => {
                    // Hide image if it fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h1>Stock Portal</h1>
                <p>Professional inventory management and RFQ system</p>
              </div>
            </div>
            <a
              href="/admin"
              className="button"
              style={{
                background: 'white',
                color: 'var(--color-primary)',
                boxShadow: 'var(--shadow-md)'
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
            background: 'var(--color-info-bg)',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
                  {selectedMaterials.length} material(s) selected
                </strong>
                <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                  Selected materials will be included in your RFQ submission
                </p>
              </div>
              <button
                className="button button-secondary"
                onClick={handleClearSelection}
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <RFQForm selectedMaterials={selectedMaterials} />
        </div>

        <div style={{
          marginTop: '3rem',
          padding: '2.5rem',
          background: 'var(--color-bg-tertiary)',
          borderRadius: '12px',
          textAlign: 'center',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)'
        }}>
          <p style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            <strong style={{ color: 'var(--color-text-primary)' }}>Questions about our stock or services?</strong>
          </p>
          <p style={{ fontSize: '1rem' }}>
            Contact us: <a href="mailto:amy.oneil@lightningcath.com" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              amy.oneil@lightningcath.com
            </a>
          </p>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label="Toggle theme"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </main>
  );
}

