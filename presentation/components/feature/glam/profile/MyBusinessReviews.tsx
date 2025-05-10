import { ScrollView, View } from "react-native";
import { useBusinessReviews } from "../../../../hooks/use-business-reviews.hook";
import { MyBusinessReviewsLoading } from "./MyBusinessReviewsLoading";
import { BusinessReviews } from "@/core/interfaces/business-reviews.interface";
import { ReviewCard } from "../shared/ReviewCard";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";

export const MyBusinessReviews = ({ id }: { id: string }) => {
  const { businessReviews, isLoading } = useBusinessReviews(id);

  if (isLoading) {
    return <MyBusinessReviewsLoading />;
  }

  if (!businessReviews || businessReviews.length === 0) {
    return (
      <View className="p-4">
        <CustomAlert
          title="Info!!!"
          description="No has recibido reseñas de tus clientes."
          type="info"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card>
          <CardContent>
            {businessReviews.map((review: BusinessReviews) => (
              <ReviewCard
                key={review.id}
                comment={review.review}
                rating={review.rating}
                userUrlPhoto={review.userImage}
                userName={review.userName}
              />
            ))}
          </CardContent>
        </Card>
      </ScrollView>
    </View>
  );
};
