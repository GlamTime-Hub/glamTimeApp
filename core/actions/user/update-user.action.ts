import axiosClient from "@/core/api/axios-client";

export const updateUser = async (user: any) => {
  try {
    const { data } = await axiosClient.post("user/update", user);

    return {
      status: true,
      data,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
