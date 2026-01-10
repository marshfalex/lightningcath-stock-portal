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
      <header className="header">
        <div className="header-content">
          <div className="header-brand">
            <div style={{ position: 'relative', width: '180px', height: '48px' }}>
              <Image
                src="/images/lightningcath-logo.png"
                alt="LightningCath Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <h1 className="header-title">Stock Portal</h1>
              <p className="header-subtitle">Professional inventory management and RFQ system</p>
            </div>
          </div>
          <a href="/admin" className="button button-secondary">
            Admin Panel →
          </a>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '8rem' }}>
        <div style={{ marginBottom: '4rem' }}>
          <StockList
            onMaterialSelect={handleMaterialSelect}
            selectedMaterials={selectedMaterials}
          />
        </div>

        {selectedMaterials.length > 0 && (
          <div className="selection-banner">
            <div className="selection-info">
              <div className="selection-count">
                {selectedMaterials.length} material{selectedMaterials.length !== 1 ? 's' : ''} selected
              </div>
              <div className="selection-description">
                Selected materials will be included in your RFQ submission
              </div>
            </div>
            <button
              className="button button-ghost"
              onClick={handleClearSelection}
            >
              Clear All
            </button>
          </div>
        )}

        <div style={{ marginTop: '4rem' }}>
          <RFQForm selectedMaterials={selectedMaterials} />
        </div>

        <div className="card" style={{
          marginTop: '6rem',
          textAlign: 'center',
          padding: '3rem'
        }}>
          <p style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Questions about our stock or services?
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
            Contact us at{' '}
            <a
              href="mailto:amy.oneil@lightningcath.com"
              style={{
                color: 'var(--color-primary)',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
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

