import { ScrollView, View } from "react-native";
import { useBusinessReviews } from "../../../../hooks/use-business-reviews.hook";
import { MyBusinessReviewsLoading } from "./MyBusinessReviewsLoading";
import { BusinessReviews } from "@/core/interfaces/business-reviews.interface";
import { ReviewCard } from "../shared/ReviewCard";
import { Card, CardContent } from "@/presentation/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";
import { AlertTriangle } from "@/lib/icons/Icons";

export const MyBusinessReviews = ({ id }: { id: string }) => {
  const { businessReviews, isLoading } = useBusinessReviews(id);

  if (isLoading) {
    return <MyBusinessReviewsLoading />;
  }

  if (!businessReviews || businessReviews.length === 0) {
    return (
      <View className="p-4">
        <Alert icon={AlertTriangle} variant="default" className="max-w-xl">
          <AlertTitle>Info!</AlertTitle>
          <AlertDescription>
            No has recibido reseñas de tus clientes.
          </AlertDescription>
        </Alert>
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
