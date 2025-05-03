import { ScrollView, View } from "react-native";
import { ReviewCard } from "../shared/ReviewCard";
import { useLocalSearchParams } from "expo-router";
import { useBusinessReviews } from "@/presentation/hooks/use-business-reviews.hook";
import { BusinessReviewLoading } from "./BusinessReviewLoading";
import { BusinessReviewEmpty } from "./BusinessReviewEmpty";

export const BusinessReviews = () => {
  const { id } = useLocalSearchParams();

  const { businessReviews, isLoading } = useBusinessReviews(id as string);

  if (isLoading) {
    return <BusinessReviewLoading />;
  }

  if (!businessReviews?.length) {
    return <BusinessReviewEmpty />;
  }

  return (
    <View className="flex-1 p-6">
      <View className="flex-1">
        <View className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false}>
            {businessReviews?.map((business) => (
              <ReviewCard
                key={business.id}
                userUrlPhoto={business.userImage}
                rating={business.rating}
                userName={business.userName}
                comment={business.review}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
