'use client';

import AdminPanel from '../components/AdminPanel';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <main>
      <div className="header">
        <div className="container">
          <h1>LightningCath Admin Portal</h1>
          <p>Manage your stock inventory, update quantities, and add new products</p>
        </div>
      </div>

      <div className="container">
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
            ← Back to Stock Portal
          </Link>
        </div>

        <AdminPanel />

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#f9fafb',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>Quick Tips</h3>
          <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Use the search bar to quickly find items by ID, description, or material family</li>
              <li>Update quantities directly in the table by clicking the quantity field</li>
              <li>Click "Edit" to modify all details of an item</li>
              <li>Export your changes as JSON to save them permanently</li>
              <li>New items must have a unique ID (format: category-number, e.g., resin-037)</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
