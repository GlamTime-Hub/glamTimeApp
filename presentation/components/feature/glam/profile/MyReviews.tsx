import { useUserReviews } from "@/presentation/hooks/use-user-reviews.hook";
import { ScrollView, Text, View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { MyReviewsLoading } from "./MyReviewsLoading";
import { ReviewCard } from "../shared/ReviewCard";

export const MyReviews = () => {
  const { data, isLoading }: any = useUserReviews();

  if (isLoading) {
    return <MyReviewsLoading />;
  }

  const reviews = data?.data ?? [];

  return (
    <View className="flex-1 p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card className="flex-1 ">
          <CardContent>
            {reviews.length === 0 ? (
              <View className="items-center justify-center py-10">
                <Text className="text-center text-lg text-gray-500">
                  Aún no has recibido reseñas.
                </Text>
              </View>
            ) : (
              reviews.map((review: any) => (
                <ReviewCard
                  key={review._id}
                  userUrlPhoto={review.photo}
                  rating={review.rating}
                  userName={review.name}
                  comment={review.review}
                />
              ))
            )}
          </CardContent>
        </Card>
      </ScrollView>
    </View>
  );
};
