import { ScrollView, Text, View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { MyReviewsLoading } from "./MyReviewsLoading";
import { ReviewCard } from "../shared/ReviewCard";
import { useProfessionalReview } from "@/presentation/hooks/use-professional-reviews.hook";
import { useUser } from "@/presentation/hooks/use-user.hook";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";
import { MessageCircleMore } from "@/lib/icons/Icons";

export const ReviewsReceived = () => {
  const { user } = useUser();

  const { data, isLoading } = useProfessionalReview(user!.id);

  if (isLoading) {
    return <MyReviewsLoading />;
  }

  const reviews = data?.data ?? [];

  if (reviews.length === 0) {
    return (
      <View className="p-6">
        <Alert icon={MessageCircleMore} variant="default" className="max-w-xl">
          <AlertTitle>Info!</AlertTitle>
          <AlertDescription>Aún no has recibido reseñas.</AlertDescription>
        </Alert>
      </View>
    );
  }

  return (
    <View className="flex-1 p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card className="flex-1 ">
          <CardContent>
            {reviews.map((review: any) => (
              <ReviewCard
                key={review._id}
                userUrlPhoto={review.urlPhoto}
                rating={review.rating}
                userName={review.name}
                comment={review.review}
              />
            ))}
          </CardContent>
        </Card>
      </ScrollView>
    </View>
  );
};
