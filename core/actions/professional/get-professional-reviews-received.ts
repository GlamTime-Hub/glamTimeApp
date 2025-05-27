import axiosClient from "@/core/api/axios-client";
import { ProfessionalReviewMapper } from "@/core/mappers/professional-review.mapper";

export const getProfessionalReviewsReceivedAction = async (userId: string) => {
  try {
    const {
      data: { data },
    } = await axiosClient.get("professional/review/" + userId);

    const reviews = data.map((review: any) =>
      ProfessionalReviewMapper.fromProfessionalReviewDBToProfessionalReview(
        review
      )
    );

    return {
      status: true,
      data: reviews,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
