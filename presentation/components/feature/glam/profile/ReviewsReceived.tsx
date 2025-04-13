import { ScrollView, Text, View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { MyReviewsLoading } from "./MyReviewsLoading";
import { ReviewCard } from "../shared/ReviewCard";
import { useProfessionalReview } from "@/presentation/hooks/use-professional-reviews.hook";
import { useUser } from "@/presentation/hooks/use-user.hook";

export const ReviewsReceived = () => {
  const { user } = useUser(null);

  const { data, isLoading } = useProfessionalReview(user!.id);

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
                  Aún no se han registrado reseñas.
                </Text>
              </View>
            ) : (
              reviews.map((review: any) => (
                <ReviewCard
                  key={review._id}
                  userUrlPhoto={review.urlPhoto}
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
