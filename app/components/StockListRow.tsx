'use client';

import { memo } from 'react';
import { StockItem } from '@/data/stockList';

interface StockListRowProps {
  item: StockItem;
  isSelected: boolean;
  onSelect?: (item: StockItem) => void;
  style?: React.CSSProperties;
}

const StockListRow = memo(({ item, isSelected, onSelect, style }: StockListRowProps) => {
  const getQuantityBadge = (quantity: number | string) => {
    if (quantity === "Coming Soon!") {
      return <span className="badge badge-warning">Coming Soon!</span>;
    }
    const numQty = typeof quantity === 'number' ? quantity : parseInt(quantity as string);
    if (numQty === 0) {
      return <span className="badge badge-error">Out of Stock</span>;
    }
    if (numQty < 50) {
      return <span className="badge badge-warning">Low Stock ({numQty})</span>;
    }
    return <span className="badge badge-success">In Stock ({numQty})</span>;
  };

  return (
    <div style={{
      ...style,
      display: 'flex',
      borderBottom: '1px solid var(--color-border-subtle)',
      transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    }}
    className="table-row-virtual"
    >
      <div style={{
        flex: '0 0 120px',
        padding: '1.25rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        display: 'flex',
        alignItems: 'center'
      }}>
        {item.id}
      </div>
      <div style={{
        flex: '0 0 150px',
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <span className="badge badge-info">{item.category}</span>
      </div>
      <div style={{
        flex: '0 0 200px',
        padding: '1.25rem',
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        {item.materialFamily}
      </div>
      <div style={{
        flex: '1 1 auto',
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        {item.description}
      </div>
      <div style={{
        flex: '0 0 180px',
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        {getQuantityBadge(item.quantity)}
      </div>
      {onSelect && (
        <div style={{
          flex: '0 0 150px',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <button
            className={isSelected ? 'button button-secondary' : 'button'}
            onClick={() => onSelect(item)}
            style={{ minWidth: '100px' }}
          >
            {isSelected ? '✕ Remove' : '+ Add'}
          </button>
        </div>
      )}
    </div>
  );
});

StockListRow.displayName = 'StockListRow';

export default StockListRow;
