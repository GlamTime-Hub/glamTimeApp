import { User } from "./user.interface";

export interface Professional {
  id: string;
  userAuthId: string;
  businessId: string;
  user: Partial<User>;
  isActive: boolean;
  workingHours: {
    monday: { start: number; end: number; isActive: boolean };
    tuesday: { start: number; end: number; isActive: boolean };
    wednesday: { start: number; end: number; isActive: boolean };
    thursday: { start: number; end: number; isActive: boolean };
    friday: { start: number; end: number; isActive: boolean };
    saturday: { start: number; end: number; isActive: boolean };
  };
  invitationStatus: string;
  createdAt: Date;
}
