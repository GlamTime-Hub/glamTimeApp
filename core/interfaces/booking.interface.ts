export interface Booking {
  id?: string;
  businessId: string;
  professionalId: string;
  professionalUserAuthId: string;
  userId: string;
  userAuthId: string;
  serviceId: string;
  categoryId: string;
  subcategoryId: string;
  serviceName: string;
  fullDate: string;
  date: Date;
  startTime: number;
  endTime: number;
  status: string;
  reason: string;
  createdAt: Date;
}
