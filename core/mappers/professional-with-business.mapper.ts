import { ProfessionalWithBusiness } from "../interfaces/business-professional.interface";

export class ProfessionalWithBusinessMapper {
  static fromProfessionalWithBusinessDBtoProfessionalWithBusiness = (
    professionalBusiness: any
  ): ProfessionalWithBusiness => {
    return {
      id: professionalBusiness._id,
      userAuthId: professionalBusiness.userAuthId,
      isActive: professionalBusiness.isActive,
      workingHours: {
        monday: professionalBusiness.workingHours.monday,
        tuesday: professionalBusiness.workingHours.tuesday,
        wednesday: professionalBusiness.workingHours.wednesday,
        thursday: professionalBusiness.workingHours.thursday,
        friday: professionalBusiness.workingHours.friday,
        saturday: professionalBusiness.workingHours.saturday,
      },
      createdAt: professionalBusiness.createdAt,
      business: {
        id: professionalBusiness.business._id,
        userAuthId: professionalBusiness.business.userAuthId,
        name: professionalBusiness.business.name,
        location: {
          address: professionalBusiness.business.location.address,
          latitude: professionalBusiness.business.location.latitude,
          longitude: professionalBusiness.business.location.longitude,
          latitudeDelta: professionalBusiness.business.location.latitudeDelta,
          longitudeDelta: professionalBusiness.business.location.longitudeDelta,
        },
        phoneNumber: professionalBusiness.business.phoneNumber,
        phoneNumberExtension:
          professionalBusiness.business.phoneNumberExtension,
        email: professionalBusiness.business.email,
        country: professionalBusiness.business.country,
        city: professionalBusiness.business.city,
        businesstype: professionalBusiness.business.businesstype,
        isActive: professionalBusiness.business.isActive,
        urlPhoto: professionalBusiness.business.urlPhoto,
      },
    };
  };
}
