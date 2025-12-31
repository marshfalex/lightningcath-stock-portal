'use client';

import { useState } from 'react';
import { generateRFQPDF, RFQData } from '@/lib/pdfGenerator';
import { StockItem } from '@/data/stockList';
import { serviceTypes } from '@/lib/leadTime';

interface RFQFormProps {
  selectedMaterials: StockItem[];
}

export default function RFQForm({ selectedMaterials }: RFQFormProps) {
  const [formData, setFormData] = useState<RFQData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectName: '',
    quantity: '',
    targetDate: '',
    selectedMaterials: selectedMaterials,
    services: [],
    specifications: {
      innerDiameter: '',
      outerDiameter: '',
      length: '',
      wallThickness: '',
      other: ''
    },
    additionalNotes: ''
  });

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('specifications.')) {
      const specField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications!,
          [specField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServiceIds(prev => {
      const isSelected = prev.includes(serviceId);
      const newIds = isSelected 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId];
      
      // Update formData services
      setFormData(prevData => ({
        ...prevData,
        services: newIds.map(id => {
          const service = serviceTypes.find(s => s.id === id);
          return {
            serviceId: id,
            serviceName: service?.name || '',
            description: service?.description || ''
          };
        })
      }));
      
      return newIds;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
      alert('Please fill in all required customer information fields.');
      return;
    }

    if (selectedMaterials.length === 0) {
      alert('Please select at least one material from the stock list.');
      return;
    }

    if (formData.services.length === 0) {
      alert('Please select at least one service requirement.');
      return;
    }

    // Update selected materials in form data
    const updatedFormData = {
      ...formData,
      selectedMaterials: selectedMaterials
    };

    // Generate PDF
    generateRFQPDF(updatedFormData);

    // Show success message
    alert('RFQ PDF generated successfully! The file has been downloaded.');
  };

  return (
    <div className="card">
      <h2>Request for Quote (RFQ)</h2>
      <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
        Fill out the form below to generate a PDF spec sheet with all technical parameters pre-filled.
      </p>

      <form onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: '1rem', color: '#1e3a8a', fontSize: '1.25rem' }}>
          Customer Information
        </h3>
        
        <div className="grid grid-2">
          <div className="input-group">
            <label htmlFor="companyName">Company Name *</label>
            <input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="contactName">Contact Name *</label>
            <input
              type="text"
              id="contactName"
              value={formData.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
            />
          </div>
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#1e3a8a', fontSize: '1.25rem' }}>
          Project Details
        </h3>

        <div className="grid grid-2">
          <div className="input-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              id="projectName"
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              placeholder="e.g., 100 units"
            />
          </div>

          <div className="input-group">
            <label htmlFor="targetDate">Target Date</label>
            <input
              type="date"
              id="targetDate"
              value={formData.targetDate}
              onChange={(e) => handleInputChange('targetDate', e.target.value)}
            />
          </div>
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#1e3a8a', fontSize: '1.25rem' }}>
          Selected Materials ({selectedMaterials.length})
        </h3>
        {selectedMaterials.length === 0 ? (
          <p style={{ color: '#ef4444', marginBottom: '1rem' }}>
            Please select materials from the Stock List above.
          </p>
        ) : (
          <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
            {selectedMaterials.map((material, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                <strong>{material.description}</strong> ({material.materialFamily})
              </li>
            ))}
          </ul>
        )}

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#1e3a8a', fontSize: '1.25rem' }}>
          Service Requirements *
        </h3>
        <div style={{ marginBottom: '1rem' }}>
          {serviceTypes.map(service => (
            <label
              key={service.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <input
                type="checkbox"
                checked={selectedServiceIds.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
                style={{ marginRight: '0.5rem', width: '18px', height: '18px' }}
              />
              <div>
                <strong>{service.name}</strong>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                  {service.description}
                </p>
              </div>
            </label>
          ))}
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#1e3a8a', fontSize: '1.25rem' }}>
          Technical Specifications
        </h3>

        <div className="grid grid-2">
          <div className="input-group">
            <label htmlFor="innerDiameter">Inner Diameter (ID)</label>
            <input
              type="text"
              id="innerDiameter"
              value={formData.specifications?.innerDiameter || ''}
              onChange={(e) => handleInputChange('specifications.innerDiameter', e.target.value)}
              placeholder="e.g., 0.010 in"
            />
          </div>

          <div className="input-group">
            <label htmlFor="outerDiameter">Outer Diameter (OD)</label>
            <input
              type="text"
              id="outerDiameter"
              value={formData.specifications?.outerDiameter || ''}
              onChange={(e) => handleInputChange('specifications.outerDiameter', e.target.value)}
              placeholder="e.g., 0.020 in"
            />
          </div>

          <div className="input-group">
            <label htmlFor="length">Length</label>
            <input
              type="text"
              id="length"
              value={formData.specifications?.length || ''}
              onChange={(e) => handleInputChange('specifications.length', e.target.value)}
              placeholder="e.g., 100 cm"
            />
          </div>

          <div className="input-group">
            <label htmlFor="wallThickness">Wall Thickness</label>
            <input
              type="text"
              id="wallThickness"
              value={formData.specifications?.wallThickness || ''}
              onChange={(e) => handleInputChange('specifications.wallThickness', e.target.value)}
              placeholder="e.g., 0.005 in"
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="other">Other Specifications</label>
          <textarea
            id="other"
            value={formData.specifications?.other || ''}
            onChange={(e) => handleInputChange('specifications.other', e.target.value)}
            rows={3}
            placeholder="Additional technical requirements..."
          />
        </div>

        <div className="input-group">
          <label htmlFor="additionalNotes">Additional Notes</label>
          <textarea
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            rows={4}
            placeholder="Any additional information or special requirements..."
          />
        </div>

        <button type="submit" className="button" style={{ marginTop: '1.5rem' }}>
          Generate RFQ PDF
        </button>
      </form>
    </div>
  );
}

