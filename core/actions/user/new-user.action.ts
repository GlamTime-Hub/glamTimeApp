import axiosClient from "@/core/api/axios-client";
import { UserMapper } from "@/core/mappers/user.mapper";

export const newUserAction = async (user: any) => {
  try {
    const {
      data: { data },
    } = await axiosClient.post("user", user);
    const userFromDB = UserMapper.fromTheUserDBToUser(data);
    return {
      status: true,
      data: userFromDB,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
