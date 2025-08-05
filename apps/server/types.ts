export interface User {
  id: string;
  name: string;
  gender: string;
  email: string;
  location: string;
  picture: string;
  latitude: number;
  longitude: number;
  weather?: {
    temp: number;
    max: number;
    min: number;
    icon: number;
  }
}