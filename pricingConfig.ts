
import { PricingConfig } from './types';

export const pricingConfig: PricingConfig = {
  services: {
    checkup: { 
      name: "Diagnostics / Checkup", 
      base: 100, 
      perDevice: 25, 
      minimum: 99 
    },
    cleanup: { 
      name: "Cleanup & Optimization", 
      base: 150, 
      perDevice: 40, 
      minimum: 150 
    },
    data: { 
      name: "Data Cleanup / Migration", 
      base: 200, 
      perDevice: 50, 
      minimum: 250 
    },
    business: { 
      name: "Small Business Consulting", 
      base: 350, 
      perDevice: 100, 
      minimum: 450 
    },
  },
  complexityModifiers: {
    1: 1.0,    // Basic
    2: 1.4,    // Standard
    3: 2.1     // Complex
  }
};

export const complexityLabels: Record<number, string> = {
  1: "Basic",
  2: "Standard",
  3: "Complex"
};
