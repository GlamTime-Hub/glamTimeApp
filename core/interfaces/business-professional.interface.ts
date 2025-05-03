interface WorkingDaySchedule {
  start: string;
  end: string;
  isActive: boolean;
}

interface WorkingHours {
  monday?: WorkingDaySchedule;
  tuesday?: WorkingDaySchedule;
  wednesday?: WorkingDaySchedule;
  thursday?: WorkingDaySchedule;
  friday?: WorkingDaySchedule;
  saturday?: WorkingDaySchedule;
  sunday?: WorkingDaySchedule;
}

interface BusinessLocation {
  address?: string;
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

interface Business {
  id: string;
  userAuthId: string;
  name: string;
  location?: BusinessLocation;
  phoneNumber: string;
  phoneNumberExtension: string;
  email: string;
  country: string;
  city: string;
  businesstype: string;
  isActive: boolean;
  urlPhoto: string;
}

export interface ProfessionalWithBusiness {
  id: string;
  userAuthId: string;
  isActive: boolean;
  workingHours: WorkingHours;
  createdAt: Date;
  business: Business;
}
