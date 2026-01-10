'use client';

import { useState, useEffect } from 'react';
import AdminPanel from '../components/AdminPanel';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import Image from 'next/image';

const ADMIN_PASSWORD = 'lightningcath2024'; // Change this to set a custom password

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { theme, toggleTheme } = useTheme();

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
              <div style={{ position: 'relative', width: '180px', height: '60px' }}>
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
                <h1>Admin Portal</h1>
                <p>Please log in to access the admin panel</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div style={{ marginBottom: '1.5rem' }}>
            <Link href="/" className="button button-secondary">
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
                />
              </div>

              {error && (
                <div style={{
                  padding: '0.75rem',
                  background: 'var(--color-error-bg)',
                  color: 'var(--color-error-text)',
                  borderRadius: '8px',
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

  return (
    <main>
      <div className="header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
              <div style={{ position: 'relative', width: '180px', height: '60px' }}>
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
                <h1>Admin Portal</h1>
                <p>Manage your stock inventory and add new products</p>
              </div>
            </div>
            <button
              className="button button-secondary"
              onClick={handleLogout}
            >
              🔒 Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/" className="button button-secondary">
            ← Back to Stock Portal
          </Link>
        </div>

        <AdminPanel />
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
