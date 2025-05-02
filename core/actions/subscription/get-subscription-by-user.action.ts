import axiosClient from "@/core/api/axios-client";

export const getSubscriptionByUser = async () => {
  try {
    const { data } = await axiosClient.get(
      "subscription/get-subscription-by-user"
    );

    console.log("response", data);

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
