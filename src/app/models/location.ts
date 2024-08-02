import { User } from './User';
export enum EmissionSource {
  NATURAL_GAS = 'NATURAL_GAS',
  ELECTRICITY = 'ELECTRICITY'
}
export interface Location {
  idLocation?: number; // Optional because it might not be set initially
  nameLocation: string;
  addressLocation: string;
  aptSuite?: string; // Optional
  city?: string; // Optional
  state?: string; // Optional
  zip?: number; // Optional
  country?: string; // Optional
  usesNaturalGas?: boolean; // Optional
  grossArea?: number; // Optional
  sq?: string; // Optional
  primaryUse?: string; // Optional
  user?: User; // Optional, add User model if necessary
  latitude?: number; // Optional
  longitude?: number; // Optional
  co2Emissions?: number;
  emissionSource: EmissionSource; 
}
