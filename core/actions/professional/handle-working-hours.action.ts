import axiosClient from "@/core/api/axios-client";

export const handleWorkingHours = async (activeWorkingHours: any) => {
  try {
    await axiosClient.post(
      "professional/handle-working-hours",
      activeWorkingHours
    );
    return {
      status: true,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
