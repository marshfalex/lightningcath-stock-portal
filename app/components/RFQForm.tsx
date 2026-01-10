'use client';

import { useState } from 'react';
import { generateRFQPDF, generateRFQPDFBase64, RFQData } from '@/lib/pdfGenerator';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);

    try {
      // Update selected materials in form data
      const updatedFormData = {
        ...formData,
        selectedMaterials: selectedMaterials
      };

      // Generate PDF as base64 for email
      const { base64, fileName } = generateRFQPDFBase64(updatedFormData);

      // Send to API
      const response = await fetch('/api/send-rfq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdfBase64: base64,
          fileName: fileName,
          customerData: {
            companyName: formData.companyName,
            contactName: formData.contactName,
            email: formData.email,
            phone: formData.phone,
            projectName: formData.projectName,
            quantity: formData.quantity,
            materialCount: selectedMaterials.length,
            serviceCount: formData.services.length,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send RFQ');
      }

      // Also download PDF locally for customer's records
      generateRFQPDF(updatedFormData);

      // Show success message
      alert('✓ RFQ submitted successfully!\n\n✉️ Emails sent to:\n• amy.oneil@lightningcath.com (with your RFQ)\n• ' + formData.email + ' (confirmation copy)\n\nWe will review your quote and respond within 1-2 business days.\n\nA copy has also been downloaded to your device for your records.');

      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        projectName: '',
        quantity: '',
        targetDate: '',
        selectedMaterials: [],
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
      setSelectedServiceIds([]);

    } catch (error: any) {
      console.error('Error submitting RFQ:', error);
      alert('❌ Error submitting RFQ: ' + error.message + '\n\nPlease try again or contact us directly at amy.oneil@lightningcath.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Request for Quote (RFQ)</h2>
      <p className="card-subtitle">
        Fill out the form below to submit your RFQ. Your request will be automatically sent to our team at <strong>amy.oneil@lightningcath.com</strong>, and you'll receive a confirmation email with a copy of your RFQ.
      </p>

      <form onSubmit={handleSubmit}>
        <h3 className="section-title">
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

        <h3 className="section-title" style={{ marginTop: '3rem' }}>
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

        <h3 className="section-title" style={{ marginTop: '3rem' }}>
          Selected Materials ({selectedMaterials.length})
        </h3>
        {selectedMaterials.length === 0 ? (
          <div className="alert alert-error">
            Please select materials from the Stock List above.
          </div>
        ) : (
          <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', color: 'var(--color-text-primary)' }}>
            {selectedMaterials.map((material, index) => (
              <li key={index} style={{ marginBottom: '0.75rem' }}>
                <strong>{material.description}</strong> <span style={{ color: 'var(--color-text-secondary)' }}>({material.materialFamily})</span>
              </li>
            ))}
          </ul>
        )}

        <h3 className="section-title" style={{ marginTop: '3rem' }}>
          Service Requirements *
        </h3>
        <div className="service-grid" style={{ marginBottom: '2rem' }}>
          {serviceTypes.map(service => (
            <div
              key={service.id}
              className={`service-card ${selectedServiceIds.includes(service.id) ? 'selected' : ''}`}
              onClick={() => handleServiceToggle(service.id)}
            >
              <input
                type="checkbox"
                className="service-card-checkbox"
                checked={selectedServiceIds.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <h4 className="service-card-title">{service.name}</h4>
              <p className="service-card-description">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <h3 className="section-title" style={{ marginTop: '3rem' }}>
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

        <div className="input-group" style={{ marginTop: '2rem' }}>
          <label htmlFor="additionalNotes">Additional Notes</label>
          <textarea
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            rows={4}
            placeholder="Any additional information or special requirements..."
          />
        </div>

        <button
          type="submit"
          className="button"
          style={{ marginTop: '3rem', width: '100%' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? '⏳ Sending...' : '📤 Submit RFQ'}
        </button>
      </form>
    </div>
  );
}

