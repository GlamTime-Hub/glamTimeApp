import axiosClient from "@/core/api/axios-client";

export const postContactAction = async (contact: any) => {
  try {
    const { data } = await axiosClient.post("contact/", contact);

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
