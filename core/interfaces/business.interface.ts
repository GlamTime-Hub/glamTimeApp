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
  businesstype: string;
  phoneNumber: string;
  phoneNumberExtension: string;
  email: string;
  country: string;
  city: string;
  isActive: boolean;
  urlPhoto: string;
  rating: number;
  likes: number;

  totalBooking: number;

  receivedReviews: number;
}
