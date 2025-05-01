import { Business } from "../interfaces/business.interface";

export class BusinessMapper {
  static fromTheBusinessDBToBusiness = (business: any): Business => {
    return {
      id: business._id,
      userAuthId: business.userAuthId,
      name: business.name,
      location: {
        address: business.location.address,
        latitude: business.location.latitude,
        longitude: business.location.longitude,
        latitudeDelta: business.location.latitudeDelta,
        longitudeDelta: business.location.longitudeDelta,
      },
      businesstype: business.businesstype,
      phoneNumber: business.phoneNumber,
      phoneNumberExtension: business.phoneNumberExtension,
      email: business.email,
      country: business.country,
      city: business.city,
      isActive: business.isActive,
      urlPhoto: business.urlPhoto,
      rating: business.rating,
      receivedReviews: business.receivedReviews,
      likes: business.likes,
      totalBooking: business.totalBooking,
    };
  };
}
