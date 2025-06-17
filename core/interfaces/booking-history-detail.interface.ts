export interface BookingHistoryDetail {
  id: string;
  serviceId: string;
  serviceName: string;
  reason: string;
  fullDate: string;
  date: Date;
  startTime: number;
  endTime: number;
  status: string;
  createdAt: Date;
  hasBusinessReview: boolean;
  hasProfessionalReview: boolean;
  user: {
    id: string;
    userAuthId: string;
    userId: string;
    urlPhoto: string;
    name: string;
  };
  professional: {
    id: string;
    userAuthId: string;
    userId: string;
    urlPhoto: string;
    name: string;
  };
  business: {
    id: string;
    name: string;
    urlPhoto: string;
    location: {
      lat: number;
      lng: number;
      address: string;
    };
  };
  professionalReview?: {
    id: string;
    rating: number;
    review: string;
    createdAt: Date;
  };
  businessReview?: {
    id: string;
    rating: number;
    review: string;
    createdAt: Date;
  };
}
