import { User } from './User';

export interface Vehicle {
  idVehicle?: number;
  name: string;
  vin?: string;
  year?: number;
  make?: string;
  model?: string;
  vanType?: string;
  carType?: string;

  motorbikeType?: string;
  hgvType?: string;
  fuelType: string;
  fuelConsumption: number;
  co2Emissions: number;
  usageData?: string;
  user?: User;
  emissionSource?: string;
  scope?: string;
  location?: string;
}
