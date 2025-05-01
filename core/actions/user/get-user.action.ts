import axiosClient from "@/core/api/axios-client";
import { UserMapper } from "@/core/mappers/user.mapper";

export const getUserAction = async () => {
  try {
    const {
      data: { data },
    } = await axiosClient.get("user");
    const user = UserMapper.fromTheUserDBToUser(data);

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
