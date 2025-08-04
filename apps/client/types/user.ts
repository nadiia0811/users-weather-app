export interface RandomUserAPI {
  login: {
    uuid: string,
    username: string,
    password: string
  },
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
