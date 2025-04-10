import { BusinessReviews } from "../interfaces/business-reviews.interface";

export class BusinessReviewsMapper {
  static fromBusinessReviewDBtoBusinessReview = (
    businessReview: any
  ): BusinessReviews => {
    return {
      id: businessReview._id,
      userName: businessReview.name,
      userImage: businessReview.urlPhoto,
      rating: businessReview.rating,
      review: businessReview.review,
    };
  };
}
