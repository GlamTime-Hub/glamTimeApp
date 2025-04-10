import { MyBusinessReviews } from "@/presentation/components/feature";
import { useLocalSearchParams } from "expo-router";

export default function MyReviewsScreen() {
  const { id } = useLocalSearchParams();

  return <MyBusinessReviews id={id as string} />;
}
