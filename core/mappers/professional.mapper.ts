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
          isActive: data.workingHours.monday.isActive,
        },
        tuesday: {
          start: data.workingHours.tuesday.start,
          end: data.workingHours.tuesday.end,
          isActive: data.workingHours.tuesday.isActive,
        },
        wednesday: {
          start: data.workingHours.wednesday.start,
          end: data.workingHours.wednesday.end,
          isActive: data.workingHours.wednesday.isActive,
        },
        thursday: {
          start: data.workingHours.thursday.start,
          end: data.workingHours.thursday.end,
          isActive: data.workingHours.thursday.isActive,
        },
        friday: {
          start: data.workingHours.friday.start,
          end: data.workingHours.friday.end,
          isActive: data.workingHours.friday.isActive,
        },
        saturday: {
          start: data.workingHours.saturday.start,
          end: data.workingHours.saturday.end,
          isActive: data.workingHours.saturday.isActive,
        },
      },
      invitationStatus: data.invitationStatus,
      rating: data.rating,
      receivedReviews: data.receivedReviews,
      totalBooking: data.totalBooking,
      likes: data.likes,
      createdAt: new Date(data.createdAt),
    };
  }
}
