import { BookingHistoryDetail } from "../interfaces/booking-history-detail.interface";

export class BookingHistoryDetailMapper {
  static fromBookingDBToBookingDetail(bookingDB: any): BookingHistoryDetail {
    return {
      id: bookingDB._id,
      serviceId: bookingDB.serviceId,
      serviceName: bookingDB.serviceName,
      reason: bookingDB.reason,
      fullDate: bookingDB.fullDate,
      date: new Date(bookingDB.date),
      startTime: bookingDB.startTime,
      endTime: bookingDB.endTime,
      status: bookingDB.status,
      createdAt: new Date(bookingDB.createdAt),
      hasBusinessReview: bookingDB.hasBusinessReview,
      hasProfessionalReview: bookingDB.hasProfessionalReview,
      professionalReview: {
        id: bookingDB.professionalReview?.id,
        rating: bookingDB.professionalReview?.rating,
        review: bookingDB.professionalReview?.review,
        createdAt: new Date(bookingDB.professionalReview.createdAt),
      },
      businessReview: {
        id: bookingDB.businessReview?.id,
        rating: bookingDB.businessReview?.rating,
        review: bookingDB.businessReview?.review,
        createdAt: new Date(bookingDB.businessReview.createdAt),
      },

      business: {
        id: bookingDB.business.id,
        name: bookingDB.business.name,
        urlPhoto: bookingDB.business.urlPhoto,
        location: bookingDB.business.location,
      },
      professional: {
        id: bookingDB.professional.id,
        name: bookingDB.professional.name,
        userAuthId: bookingDB.professional.userAuthId,
        userId: bookingDB.professional.userId,
        urlPhoto: bookingDB.professional.urlPhoto,
      },
      user: {
        id: bookingDB.user.id,
        name: bookingDB.user.name,
        urlPhoto: bookingDB.user.urlPhoto,
        userAuthId: bookingDB.user.userAuthId,
        userId: bookingDB.user.userId,
      },
    };
  }
}
