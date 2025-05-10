import { Booking } from "../interfaces/booking.interface";

export class BookingMapper {
  static fromBookingDBtoBooking = (booking: any): Booking => {
    return {
      id: booking.id,
      professionalUserAuthId: booking.professionalUserAuthId,
      businessId: booking.businessId,
      professionalId: booking.professionalId,
      userId: booking.userId,
      userAuthId: booking.userAuthId,
      serviceId: booking.serviceId,
      categoryId: booking.categoryId,
      subcategoryId: booking.subcategoryId,
      serviceName: booking.serviceName,
      fullDate: booking.fullDate,
      date: new Date(booking.date),
      startTime: booking.startTime,
      endTime: booking.endTime,
      status: booking.status,
      reason: booking.reason,
      createdAt: new Date(booking.createdAt),
    };
  };
}
