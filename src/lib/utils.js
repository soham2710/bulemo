// src/lib/utils.js

/**
 * Convert a string to a URL-friendly slug
 * @param {string} string - The string to convert to a slug
 * @returns {string} - The slugified string
 */
export function slugify(string) {
    return string
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  /**
   * Format a date to a readable string
   * @param {Date|string} date - The date to format
   * @returns {string} - The formatted date string
   */
  export function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  /**
   * Format a date to include time
   * @param {Date|string} date - The date to format
   * @returns {string} - The formatted date and time string
   */
  export function formatDateTime(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  /**
   * Truncate a string to a specified length
   * @param {string} str - The string to truncate
   * @param {number} length - The maximum length
   * @returns {string} - The truncated string
   */
  export function truncate(str, length = 100) {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  }
  
  /**
   * Parse CSV data from a string
   * @param {string} csvString - The CSV string to parse
   * @returns {Array} - Array of objects representing the CSV data
   */
  export function parseCSV(csvString) {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      if (!line.trim()) return null;
      
      const values = line.split(',');
      const entry = {};
      
      headers.forEach((header, index) => {
        entry[header.trim()] = values[index]?.trim() || '';
      });
      
      return entry;
    }).filter(Boolean);
  }
  
  /**
   * Generate CSV data from an array of objects
   * @param {Array} data - The data to convert to CSV
   * @returns {string} - The CSV string
   */
  export function generateCSV(data) {
    if (!data || !data.length) return '';
    
    const headers = Object.keys(data[0]);
    const headerRow = headers.join(',');
    
    const rows = data.map(item => {
      return headers.map(header => {
        // Handle values that contain commas
        const value = item[header] !== null && item[header] !== undefined ? item[header].toString() : '';
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',');
    });
    
    return [headerRow, ...rows].join('\n');
  }