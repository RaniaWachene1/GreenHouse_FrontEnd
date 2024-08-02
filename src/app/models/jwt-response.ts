// jwt-response.ts
export interface JwtResponse {
  accessToken: string;
  token: string;
  idUser: number;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  sector: string;
  industry: string;
  roles: string[];
  revenue: number;
  headquarters: string;
  currency: string;
  profileComplete: boolean;
}
