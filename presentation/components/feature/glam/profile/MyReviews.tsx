import { useUserReviews } from "@/presentation/hooks/use-user-reviews.hook";
import { ScrollView, View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { MyReviewsLoading } from "./MyReviewsLoading";
import { ReviewCard } from "../shared/ReviewCard";

import { CustomAlert } from "@/presentation/components/ui/CustomAlert";

export const MyReviews = () => {
  const { data, isLoading }: any = useUserReviews();

  if (isLoading) {
    return <MyReviewsLoading />;
  }

  const reviews = data?.data ?? [];

  if (reviews.length === 0) {
    return (
      <View className="p-4">
        <CustomAlert
          title="Info!!!"
          description="Aún no has creado reseñas."
          type="info"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {reviews.map((review: any) => (
          <ReviewCard
            key={review.id}
            userUrlPhoto={review.photo}
            rating={review.rating}
            userName={review.name}
            comment={review.review}
          />
        ))}
      </ScrollView>
    </View>
  );
};
