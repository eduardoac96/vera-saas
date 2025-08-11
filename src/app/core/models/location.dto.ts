export interface LocationDto {
  country: string;
  state?: string;
  city: string;
  addressLine1: string; 
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}