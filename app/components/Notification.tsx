'use client';

import { useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
  duration?: number;
}

export default function Notification({ message, type, onClose, duration = 5000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const colors = {
    success: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
    error: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
    warning: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
    info: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' }
  };

  const color = colors[type];

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: color.bg,
        border: `2px solid ${color.border}`,
        color: color.text,
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 9999,
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease-out',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <span style={{ flex: 1, fontWeight: '500' }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: color.text,
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '0',
          lineHeight: '1'
        }}
      >
        ×
      </button>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
