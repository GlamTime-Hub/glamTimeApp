import { User } from "./user.interface";

export interface Professional {
  id: string;
  userAuthId: string;
  businessId: string;
  user: Partial<User>;
  isActive: boolean;
  workingHours: {
    monday: { start: number; end: number }[];
    tuesday: { start: number; end: number }[];
    wednesday: { start: number; end: number }[];
    thursday: { start: number; end: number }[];
    friday: { start: number; end: number }[];
    saturday: { start: number; end: number }[];
    sunday: { start: number; end: number }[];
  };
  invitationStatus: string;
  createdAt: Date;
  likes: number;
  rating: number;
  receivedReviews: number;
  totalBooking: number;
}
