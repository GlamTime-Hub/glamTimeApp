export interface User {
  id: string;
  userAuthId: string;
  name: string;
  urlPhoto: string;
  phoneNumber: string;
  phoneNumberExtension: string;
  email: string;
  country: string;
  city: string;
  gender: string;
  notificationPreference: {
    push: boolean;
    news: boolean;
  };
  role: string;
  birthDay: number;
  birthMonth: number;
  likedBusinessIds: string[];
  likedProfessionalIds: string[];
}
