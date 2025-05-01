import axiosClient from "@/core/api/axios-client";
import { UserMapper } from "@/core/mappers/user.mapper";

export const getUserByPhoneNumberAction = async (
  phoneNumber: string,
  phoneNumberExtension: string
) => {
  try {
    const {
      data: { data },
    } = await axiosClient.get(
      `user/by-phone/${phoneNumber}/${phoneNumberExtension}`
    );
    const user = data ? UserMapper.fromTheUserDBToUser(data) : null;
    return {
      status: true,
      data: user,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
