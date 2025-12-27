// Lead time calculation logic for LightningCath services
import { addBusinessDays, format } from 'date-fns';

export interface ServiceType {
  id: string;
  name: string;
  baseDays: number; // Base lead time in business days
  description: string;
}

export const serviceTypes: ServiceType[] = [
  {
    id: 'single-lumen',
    name: 'Single-Lumen Extrusion',
    baseDays: 5,
    description: 'Standard single-lumen tube extrusion'
  },
  {
    id: 'multi-lumen',
    name: 'Multi-Lumen Extrusion',
    baseDays: 7,
    description: 'Multi-lumen tube extrusion with custom lumen configuration'
  },
  {
    id: 'braiding',
    name: 'Braiding/Coiling',
    baseDays: 3,
    description: 'Wire braiding or coiling for kink resistance'
  },
  {
    id: 'multi-braiding',
    name: 'Multi-Lumen + Braiding',
    baseDays: 10,
    description: 'Multi-lumen extrusion with braiding/coiling'
  },
  {
    id: 'laser-welding',
    name: 'Laser Welding',
    baseDays: 4,
    description: 'Precision laser welding services'
  },
  {
    id: 'tipping',
    name: 'Tipping',
    baseDays: 3,
    description: 'Catheter tip forming and finishing'
  },
  {
    id: 'full-assembly',
    name: 'Full Assembly',
    baseDays: 14,
    description: 'Complete catheter assembly with cleanroom manufacturing'
  },
  {
    id: 'quick-turn',
    name: 'Quick-Turn Prototype',
    baseDays: 3,
    description: 'Rush prototype service (subject to availability)'
  }
];

/**
 * Calculate estimated delivery date based on service type
 * @param serviceId - The service type ID
 * @param startDate - Optional start date (defaults to today)
 * @returns Estimated delivery date as formatted string
 */
export function calculateLeadTime(
  serviceId: string,
  startDate: Date = new Date()
): { deliveryDate: Date; formattedDate: string; businessDays: number } {
  const service = serviceTypes.find(s => s.id === serviceId);
  
  if (!service) {
    throw new Error(`Service type ${serviceId} not found`);
  }

  const deliveryDate = addBusinessDays(startDate, service.baseDays);
  const formattedDate = format(deliveryDate, 'EEEE, MMMM d, yyyy');

  return {
    deliveryDate,
    formattedDate,
    businessDays: service.baseDays
  };
}

/**
 * Get service type by ID
 */
export function getServiceType(serviceId: string): ServiceType | undefined {
  return serviceTypes.find(s => s.id === serviceId);
}

