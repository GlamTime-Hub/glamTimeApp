import { useUserReviews } from "@/presentation/hooks/use-user-reviews.hook";
import { ScrollView, Text, View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { MyReviewsLoading } from "./MyReviewsLoading";
import { ReviewCard } from "../shared/ReviewCard";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";
import { MessageCircleMore } from "@/lib/icons/Icons";

export const MyReviews = () => {
  const { data, isLoading }: any = useUserReviews();

  if (isLoading) {
    return <MyReviewsLoading />;
  }

  const reviews = data?.data ?? [];

  if (reviews.length === 0) {
    return (
      <View className="p-4">
        <Alert icon={MessageCircleMore} variant="default" className="max-w-xl">
          <AlertTitle>Info!</AlertTitle>
          <AlertDescription>Aún no has creado reseñas.</AlertDescription>
        </Alert>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card className="flex-1 ">
          <CardContent>
            {reviews.map((review: any) => (
              <ReviewCard
                key={review._id}
                userUrlPhoto={review.photo}
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
