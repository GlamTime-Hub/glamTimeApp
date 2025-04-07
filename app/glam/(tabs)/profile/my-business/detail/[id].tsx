import { MyBusinessDetail } from "@/presentation/components/feature";
import { useLocalSearchParams } from "expo-router/build/hooks";

export default function MyBusinessDetailScreen() {
  const { id } = useLocalSearchParams();

  return <MyBusinessDetail id={id as string} />;
}
