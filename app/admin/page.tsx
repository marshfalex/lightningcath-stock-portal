'use client';

import { useState, useEffect } from 'react';
import AdminPanel from '../components/AdminPanel';
import Link from 'next/link';

const ADMIN_PASSWORD = 'lightningcath2024'; // Change this to set a custom password

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
      </div>
    </main>
  );
}
