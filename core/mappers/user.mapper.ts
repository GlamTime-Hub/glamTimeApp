import { User } from "../interfaces/user.interface";

export class UserMapper {
  static fromTheUserDBToUser = (user: any): User => {
    return {
      id: user._id,
      userAuthId: user.userAuthId,
      name: user.name,
      urlPhoto: user.urlPhoto,
      phoneNumber: user.phoneNumber,
      phoneNumberExtension: user.phoneNumberExtension,
      email: user.email,
      country: user.country,
      birthDay: user.birthDay,
      birthMonth: user.birthMonth,
      city: user.city,
      gender: user.gender,
      notificationPreference: {
        push: user.notificationPreference.push,
        news: user.notificationPreference.news,
      },
      role: user.role,
      likedBusinessIds: user.likedBusinessIds || [],
      likedProfessionalIds: user.likedProfessionalIds || [],
    };
  };
}
