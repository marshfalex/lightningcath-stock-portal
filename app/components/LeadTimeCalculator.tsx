'use client';

import { useState } from 'react';
import { serviceTypes, calculateLeadTime, ServiceType } from '@/lib/leadTime';

export default function LeadTimeCalculator() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [targetDate, setTargetDate] = useState<string>('');
  const [result, setResult] = useState<{
    deliveryDate: Date;
    formattedDate: string;
    businessDays: number;
  } | null>(null);

  const handleCalculate = () => {
    if (!selectedService) {
      alert('Please select a service type');
      return;
    }

    try {
      const startDate = targetDate ? new Date(targetDate) : new Date();
      const calculated = calculateLeadTime(selectedService, startDate);
      setResult(calculated);
    } catch (error) {
      alert('Error calculating lead time. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="card">
      <h2>Lead Time Estimator</h2>
      <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
        Estimate delivery dates based on service type and current shop capacity.
      </p>

      <div className="input-group">
        <label htmlFor="service">Service Type *</label>
        <select
          id="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Select a service...</option>
          {serviceTypes.map(service => (
            <option key={service.id} value={service.id}>
              {service.name} ({service.baseDays} business days)
            </option>
          ))}
        </select>
        {selectedService && (
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            {serviceTypes.find(s => s.id === selectedService)?.description}
          </p>
        )}
      </div>

      <div className="input-group">
        <label htmlFor="targetDate">Target Start Date (Optional)</label>
        <input
          type="date"
          id="targetDate"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Leave blank to start from today
        </p>
      </div>

      <button className="button" onClick={handleCalculate}>
        Calculate Lead Time
      </button>

      {result && (
        <div className="lead-time-result">
          <h3>Estimated Delivery Date</h3>
          <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            {result.formattedDate}
          </p>
          <p style={{ color: '#6b7280' }}>
            Estimated lead time: <strong>{result.businessDays} business days</strong>
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <em>Note: This is an estimate. Actual delivery times may vary based on current shop capacity and order complexity.</em>
          </p>
        </div>
      )}
    </div>
  );
}

