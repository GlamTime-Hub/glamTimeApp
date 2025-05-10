import { BookingDetail } from "../interfaces/booking-detail.interface";

export class BookingDetailMapper {
  static fromBookingDetailDBToBookingDetail(booking: any): BookingDetail {
    return {
      id: booking._id,
      date: new Date(booking.date),
      startTime: booking.startTime,
      endTime: booking.endTime,
      status: booking.status,
      serviceName: booking.serviceName,
      serviceId: booking.serviceId,
      business: {
        id: booking.business.id,
        name: booking.business.name,
        urlPhoto: booking.business.urlPhoto,
        location: booking.business.location,
      },
      fullDate: booking.fullDate,
      createdAt: new Date(booking.createdAt),
      professional: {
        id: booking.professional.id,
        name: booking.professional.name,
        urlPhoto: booking.professional.urlPhoto,
      },
    };
  }
}
