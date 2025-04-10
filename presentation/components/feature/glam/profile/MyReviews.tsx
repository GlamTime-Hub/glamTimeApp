import { useUserReviews } from "@/presentation/hooks/use-user-reviews.hook";
import { ScrollView } from "react-native";
import { BusinessProfessionalCommentCard } from "../business/BusinessProfessionalCommentCard";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { MyReviewsLoading } from "./MyReviewsLoading";

export const MyReviews = () => {
  const { data, isLoading }: any = useUserReviews();

  if (isLoading) {
    return <MyReviewsLoading />;
  }

  return (
    <Card className="m-4 flex-1">
      <CardContent className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.data.map((review: any) => (
            <BusinessProfessionalCommentCard
              key={review._id}
              userUrlPhoto={review.photo}
              rating={review.rating}
              userName={review.name}
              comment={review.review}
            />
          ))}
        </ScrollView>
      </CardContent>
    </Card>
  );
};
