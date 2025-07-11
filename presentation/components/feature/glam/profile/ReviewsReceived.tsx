import { ScrollView, View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { MyReviewsLoading } from "./MyReviewsLoading";
import { ReviewCard } from "../shared/ReviewCard";
import { useProfessionalReview } from "@/presentation/hooks/use-professional-reviews.hook";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";
import { MessageCircleMore } from "@/lib/icons/Icons";
import { useUserStore } from "@/presentation/store/use-user.store";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";

export const ReviewsReceived = () => {
  const { user } = useUserStore();

  const { data, isLoading } = useProfessionalReview(user!.id);

  if (isLoading) {
    return <MyReviewsLoading />;
  }

  const reviews = data?.data ?? [];

  if (reviews.length === 0) {
    return (
      <View className="p-4">
        <CustomAlert
          title="Info!!!"
          description="Aún no has recibido reseñas."
          type="info"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        {reviews.map((review: any) => (
          <ReviewCard
            key={review.id}
            userUrlPhoto={review.urlPhoto}
            rating={review.rating}
            userName={review.name}
            comment={review.review}
          />
        ))}
      </ScrollView>
    </View>
  );
};
