export interface User {
  id?: string;
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

export interface RandomUserAPI {
  gender: string;
  name: { first: string; last: string };
  location: {
    city: string;
    country: string;
    coordinates: { latitude: string; longitude: string };
  };
  email: string;
  picture: { large: string };
}
