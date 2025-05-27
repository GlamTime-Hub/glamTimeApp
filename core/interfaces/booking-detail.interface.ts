export interface BookingDetail {
  id: string;
  date: Date;
  startTime: number;
  endTime: number;
  status: string;
  serviceName: string;
  serviceId: string;
  reason: string;
  hasBusinessReview: boolean;
  hasProfessionalReview: boolean;
  user: {
    id: string;
    name: string;
    urlPhoto: string;
    userAuthId: string;
    userId: string;
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
  fullDate: string;
  createdAt: Date;
  professional: {
    id: string;
    name: string;
    urlPhoto: string;
    userAuthId: string;
    userId: string;
  };
}
