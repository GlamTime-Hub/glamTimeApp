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
        monday: data.workingHours.monday,
        tuesday: data.workingHours.tuesday,
        wednesday: data.workingHours.wednesday,
        thursday: data.workingHours.thursday,
        friday: data.workingHours.friday,
        saturday: data.workingHours.saturday,
        sunday: data.workingHours.sunday,
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
