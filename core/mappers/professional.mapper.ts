import { Professional } from "../interfaces/professional.interface";

export class ProfessionalMapper {
  static fromTheProfessionalDBToProfessional(data: any): Professional {
    return {
      id: data._id,
      userAuthId: data.userAuthId,
      businessId: data.businessId,
      user: {
        id: data.user._id,
        name: data.user.name,
        urlPhoto: data.user.urlPhoto,
        phoneNumber: data.user.phoneNumber,
        email: data.user.email,
      },
      isActive: data.isActive,
      workingHours: {
        monday: {
          start: data.workingHours.monday.start,
          end: data.workingHours.monday.end,
        },
        tuesday: {
          start: data.workingHours.tuesday.start,
          end: data.workingHours.tuesday.end,
        },
        wednesday: {
          start: data.workingHours.wednesday.start,
          end: data.workingHours.wednesday.end,
        },
        thursday: {
          start: data.workingHours.thursday.start,
          end: data.workingHours.thursday.end,
        },
        friday: {
          start: data.workingHours.friday.start,
          end: data.workingHours.friday.end,
        },
        saturday: {
          start: data.workingHours.saturday.start,
          end: data.workingHours.saturday.end,
        },
      },
      invitationStatus: data.invitationStatus,
      createdAt: new Date(data.createdAt),
    };
  }
}
