import axiosClient from "@/core/api/axios-client";

export const updateBusinessStatusAction = async (
  id: string,
  isActive: boolean
) => {
  try {
    await axiosClient.put("business/handle-business-status", {
      id,
      isActive,
    });
    return {
      status: true,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
