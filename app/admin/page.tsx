'use client';

import { useState, useEffect } from 'react';
import AdminPanel from '../components/AdminPanel';
import Link from 'next/link';

const ADMIN_PASSWORD = 'lightningcath2024'; // Amy can change this

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'authenticated');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <main>
        <div className="header">
          <div className="container">
            <h1>LightningCath Admin Portal</h1>
            <p>Please log in to access the admin panel</p>
          </div>
        </div>

        <div className="container">
          <div style={{ marginBottom: '1.5rem' }}>
            <Link href="/" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
              ← Back to Stock Portal
            </Link>
          </div>

          <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Admin Login</h2>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  style={{ fontSize: '1rem' }}
                />
              </div>

              {error && (
                <div style={{
                  padding: '0.75rem',
                  background: '#fee2e2',
                  color: '#991b1b',
                  borderRadius: '4px',
                  marginBottom: '1rem'
                }}>
                  {error}
                </div>
              )}

              <button type="submit" className="button" style={{ width: '100%' }}>
                Log In
              </button>
            </form>

            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: '#fef3c7',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}>
              <strong>📧 For Amy:</strong>
              <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                Default password: <code style={{
                  background: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                }}>lightningcath2024</code>
                <br />
                <small style={{ color: '#92400e' }}>
                  To change the password, update the ADMIN_PASSWORD variable in app/admin/page.tsx
                </small>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1>LightningCath Admin Portal</h1>
              <p>Manage your stock inventory, update quantities, and add new products</p>
            </div>
            <button
              className="button button-secondary"
              onClick={handleLogout}
              style={{
                background: '#6b7280',
                color: 'white',
                padding: '0.75rem 1.5rem'
              }}
            >
              🔒 Logout
            </button>
          </div>
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
