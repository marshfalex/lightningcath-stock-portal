// Utility functions for importing/exporting stock data

import { StockItem } from '@/data/stockList';

/**
 * Convert stock items to CSV format
 */
export function convertToCSV(items: StockItem[]): string {
  // Define headers
  const headers = [
    'ID',
    'Category',
    'Material Family',
    'Description',
    'Quantity',
    'Notes',
    // FEP Heat Shrink fields
    'Exp ID (MIN)',
    'Rec ID (MAX)',
    'Rec Wall',
    'Shrink Ratio',
    'Length',
    // Single Lumen Extrusions fields
    'Material',
    'ID Spec',
    'WT',
    'OD Ref'
  ];

  // Convert items to CSV rows
  const rows = items.map(item => [
    item.id,
    item.category,
    item.materialFamily,
    `"${item.description.replace(/"/g, '""')}"`, // Escape quotes
    item.quantity,
    `"${item.notes.replace(/"/g, '""')}"`,
    item.expIdMin || '',
    item.recIdMax || '',
    item.recWall || '',
    item.shrinkRatio || '',
    item.length || '',
    item.material || '',
    item.id_spec || '',
    item.wt || '',
    item.odRef || ''
  ]);

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

/**
 * Download CSV file
 */
export function downloadCSV(items: StockItem[], filename: string = 'lightningcath-stock.csv') {
  const csv = convertToCSV(items);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Parse CSV to stock items
 */
export function parseCSV(csvText: string): StockItem[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).filter(line => line.trim()).map(line => {
    // Simple CSV parser (handles quoted fields)
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current); // Add last value

    const item: any = {
      id: values[0],
      category: values[1],
      materialFamily: values[2],
      description: values[3],
      quantity: values[4] === 'Coming Soon!' ? values[4] : parseInt(values[4]) || 0,
      notes: values[5] || ''
    };

    // Add optional fields if they exist
    if (values[6]) item.expIdMin = values[6];
    if (values[7]) item.recIdMax = values[7];
    if (values[8]) item.recWall = values[8];
    if (values[9]) item.shrinkRatio = values[9];
    if (values[10]) item.length = values[10];
    if (values[11]) item.material = values[11];
    if (values[12]) item.id_spec = values[12];
    if (values[13]) item.wt = values[13];
    if (values[14]) item.odRef = values[14];

    return item as StockItem;
  });
}

/**
 * Local Storage helpers
 */
const STORAGE_KEY = 'lightningcath_stock_data';
const STORAGE_VERSION = '1.0';

export function saveToLocalStorage(items: StockItem[]): void {
  try {
    const data = {
      version: STORAGE_VERSION,
      timestamp: new Date().toISOString(),
      items: items
    };
    const jsonData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, jsonData);
    console.log(`[localStorage] Saved ${items.length} items to key: ${STORAGE_KEY}`);
    console.log(`[localStorage] Data size: ${jsonData.length} characters`);
  } catch (error) {
    console.error('[localStorage] Failed to save:', error);
    throw new Error('Failed to save changes. Storage might be full.');
  }
}

export function loadFromLocalStorage(): StockItem[] | null {
  try {
    console.log(`[localStorage] Attempting to load from key: ${STORAGE_KEY}`);
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      console.log('[localStorage] No data found in storage');
      return null;
    }

    console.log(`[localStorage] Found data, size: ${stored.length} characters`);
    const data = JSON.parse(stored);
    console.log(`[localStorage] Parsed data, version: ${data.version}`);

    if (data.version === STORAGE_VERSION) {
      console.log(`[localStorage] Version match! Returning ${data.items.length} items`);
      return data.items;
    }

    console.log(`[localStorage] Version mismatch: ${data.version} !== ${STORAGE_VERSION}`);
    return null;
  } catch (error) {
    console.error('[localStorage] Failed to load:', error);
    return null;
  }
}

export function clearLocalStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasLocalStorageData(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}
