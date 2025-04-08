export interface Business {
  id: string;
  userAuthId: string;
  name: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  phoneNumber: string;
  phoneNumberExtension: string;
  email: string;
  country: string;
  city: string;
  isActive: boolean;
  urlPhoto: string;
  rating: number;

  receivedReviews: number;
}
