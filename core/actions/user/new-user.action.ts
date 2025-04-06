import axiosClient from "@/core/api/axios-client";

export const newUserAction = async (user: any) => {
  try {
    const { data } = await axiosClient.post("user", user);

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
