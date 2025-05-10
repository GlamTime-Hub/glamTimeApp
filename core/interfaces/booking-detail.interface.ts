export interface BookingDetail {
  id: string;
  date: Date;
  startTime: number;
  endTime: number;
  status: string;
  serviceName: string;
  serviceId: string;
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
  };
}
