import { ProfessionalReview } from "../interfaces/professional-review.interface";

export class ProfessionalReviewMapper {
  static fromProfessionalReviewDBToProfessionalReview = (
    professionalReview: any
  ): ProfessionalReview => {
    return {
      id: professionalReview._id,
      name: professionalReview.name,
      rating: professionalReview.rating,
      review: professionalReview.review,
      urlPhoto: professionalReview.urlPhoto,
    };
  };
}
