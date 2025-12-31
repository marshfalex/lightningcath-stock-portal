// PDF generation for RFQ (Request for Quote) documents
import jsPDF from 'jspdf';

export interface RFQData {
  // Customer Information
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  
  // Project Details
  projectName?: string;
  quantity?: string;
  targetDate?: string;
  
  // Material Selection
  selectedMaterials: Array<{
    materialFamily: string;
    description: string;
    notes?: string;
  }>;
  
  // Service Requirements
  services: Array<{
    serviceId: string;
    serviceName: string;
    description: string;
  }>;
  
  // Technical Specifications
  specifications?: {
    innerDiameter?: string;
    outerDiameter?: string;
    length?: string;
    wallThickness?: string;
    other?: string;
  };
  
  // Additional Notes
  additionalNotes?: string;
}

/**
 * Generate a PDF RFQ document from form data
 */
export function generateRFQPDF(data: RFQData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Request for Quote (RFQ)', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('LightningCath - Minimally Invasive Medical Device Manufacturing', margin, yPosition);
  yPosition += 15;

  // Customer Information Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Customer Information', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Company: ${data.companyName}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Contact: ${data.contactName}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Email: ${data.email}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Phone: ${data.phone}`, margin, yPosition);
  yPosition += 10;

  // Project Details
  if (data.projectName || data.quantity || data.targetDate) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Project Details', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    if (data.projectName) {
      doc.text(`Project Name: ${data.projectName}`, margin, yPosition);
      yPosition += 6;
    }
    if (data.quantity) {
      doc.text(`Quantity: ${data.quantity}`, margin, yPosition);
      yPosition += 6;
    }
    if (data.targetDate) {
      doc.text(`Target Date: ${data.targetDate}`, margin, yPosition);
      yPosition += 6;
    }
    yPosition += 10;
  }

  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = margin;
  }

  // Material Selection
  if (data.selectedMaterials.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Selected Materials', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    data.selectedMaterials.forEach((material, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(`${index + 1}. ${material.description}`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`   Family: ${material.materialFamily}`, margin + 5, yPosition);
      yPosition += 5;
      if (material.notes) {
        doc.text(`   Notes: ${material.notes}`, margin + 5, yPosition);
        yPosition += 5;
      }
      yPosition += 3;
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
    });
    yPosition += 5;
  }

  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = margin;
  }

  // Service Requirements
  if (data.services.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Service Requirements', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    data.services.forEach((service, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(`${index + 1}. ${service.serviceName}`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`   ${service.description}`, margin + 5, yPosition);
      yPosition += 8;
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
    });
    yPosition += 5;
  }

  // Technical Specifications
  if (data.specifications) {
    const specs = data.specifications;
    if (specs.innerDiameter || specs.outerDiameter || specs.length || specs.wallThickness || specs.other) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Technical Specifications', margin, yPosition);
      yPosition += 8;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      if (specs.innerDiameter) {
        doc.text(`Inner Diameter (ID): ${specs.innerDiameter}`, margin, yPosition);
        yPosition += 6;
      }
      if (specs.outerDiameter) {
        doc.text(`Outer Diameter (OD): ${specs.outerDiameter}`, margin, yPosition);
        yPosition += 6;
      }
      if (specs.length) {
        doc.text(`Length: ${specs.length}`, margin, yPosition);
        yPosition += 6;
      }
      if (specs.wallThickness) {
        doc.text(`Wall Thickness: ${specs.wallThickness}`, margin, yPosition);
        yPosition += 6;
      }
      if (specs.other) {
        doc.text(`Other: ${specs.other}`, margin, yPosition);
        yPosition += 6;
      }
      yPosition += 5;
    }
  }

  // Additional Notes
  if (data.additionalNotes) {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = margin;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Additional Notes', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const splitNotes = doc.splitTextToSize(data.additionalNotes, pageWidth - 2 * margin);
    doc.text(splitNotes, margin, yPosition);
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`,
      pageWidth - margin,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'right' }
    );
  }

  // Save the PDF
  const fileName = `RFQ_${data.companyName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}

/**
 * Generate a PDF RFQ document and return as base64 string (for email attachments)
 */
export function generateRFQPDFBase64(data: RFQData): { base64: string; fileName: string } {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Request for Quote (RFQ)', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('LightningCath - Minimally Invasive Medical Device Manufacturing', margin, yPosition);
  yPosition += 15;

  // Customer Information Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Customer Information', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Company: ${data.companyName}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Contact: ${data.contactName}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Email: ${data.email}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Phone: ${data.phone}`, margin, yPosition);
  yPosition += 10;

  // Project Details
  if (data.projectName || data.quantity || data.targetDate) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Project Details', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    if (data.projectName) {
      doc.text(`Project Name: ${data.projectName}`, margin, yPosition);
      yPosition += 6;
    }
    if (data.quantity) {
      doc.text(`Quantity: ${data.quantity}`, margin, yPosition);
      yPosition += 6;
    }
    if (data.targetDate) {
      doc.text(`Target Date: ${data.targetDate}`, margin, yPosition);
      yPosition += 6;
    }
    yPosition += 10;
  }

  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = margin;
  }

  // Material Selection
  if (data.selectedMaterials.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Selected Materials', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    data.selectedMaterials.forEach((material, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(`${index + 1}. ${material.description}`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`   Family: ${material.materialFamily}`, margin + 5, yPosition);
      yPosition += 5;
      if (material.notes) {
        doc.text(`   Notes: ${material.notes}`, margin + 5, yPosition);
        yPosition += 5;
      }
      yPosition += 3;
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
    });
    yPosition += 5;
  }

  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = margin;
  }

  // Service Requirements
  if (data.services.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Service Requirements', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    data.services.forEach((service, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(`${index + 1}. ${service.serviceName}`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`   ${service.description}`, margin + 5, yPosition);
      yPosition += 8;
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
    });
    yPosition += 5;
  }

  // Technical Specifications
  if (data.specifications) {
    const specs = data.specifications;
    if (specs.innerDiameter || specs.outerDiameter || specs.length || specs.wallThickness || specs.other) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Technical Specifications', margin, yPosition);
      yPosition += 8;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      if (specs.innerDiameter) {
        doc.text(`Inner Diameter (ID): ${specs.innerDiameter}`, margin, yPosition);
        yPosition += 6;
      }
      if (specs.outerDiameter) {
        doc.text(`Outer Diameter (OD): ${specs.outerDiameter}`, margin, yPosition);
        yPosition += 6;
      }
      if (specs.length) {
        doc.text(`Length: ${specs.length}`, margin, yPosition);
        yPosition += 6;
      }
      if (specs.wallThickness) {
        doc.text(`Wall Thickness: ${specs.wallThickness}`, margin, yPosition);
        yPosition += 6;
      }
      if (specs.other) {
        doc.text(`Other: ${specs.other}`, margin, yPosition);
        yPosition += 6;
      }
      yPosition += 5;
    }
  }

  // Additional Notes
  if (data.additionalNotes) {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = margin;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Additional Notes', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const splitNotes = doc.splitTextToSize(data.additionalNotes, pageWidth - 2 * margin);
    doc.text(splitNotes, margin, yPosition);
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`,
      pageWidth - margin,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'right' }
    );
  }

  // Return as base64
  const fileName = `RFQ_${data.companyName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  const pdfBase64 = doc.output('datauristring').split(',')[1]; // Remove data:application/pdf;base64, prefix

  return { base64: pdfBase64, fileName };
}

