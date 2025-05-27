import { ScrollView, View } from "react-native";
import { ReviewCard } from "../shared/ReviewCard";
import { ReviewLoading } from "./BusinessReviewLoading";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { useAllProfessionalReview } from "@/presentation/hooks/use-all-professional-review";
import { ProfessionalReview } from "@/core/interfaces/professional-review.interface";

interface Props {
  professionalId: string;
}

export const BusinessProfessionalComments = ({ professionalId }: Props) => {
  const { data, isLoading } = useAllProfessionalReview(professionalId);

  if (isLoading) return <ReviewLoading />;

  if (!data?.data.length)
    return (
      <View>
        <CustomAlert
          title="Info!!!"
          description="El profesional no tiene comentarios aún."
          type="info"
        />
      </View>
    );

  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.data.map((rewiew: ProfessionalReview) => (
          <ReviewCard
            key={rewiew.id}
            userUrlPhoto={rewiew.urlPhoto}
            rating={rewiew.rating}
            userName={rewiew.name}
            comment={rewiew.review}
          />
        ))}
      </ScrollView>
    </View>
  );
};
