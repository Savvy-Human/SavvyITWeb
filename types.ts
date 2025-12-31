
export interface ServicePriceRule {
  name: string;
  base: number;
  perDevice: number;
  minimum: number;
}

export interface PricingConfig {
  services: Record<string, ServicePriceRule>;
  complexityModifiers: Record<number, number>;
}

export type PricingServiceKey = 'checkup' | 'cleanup' | 'data' | 'business';
