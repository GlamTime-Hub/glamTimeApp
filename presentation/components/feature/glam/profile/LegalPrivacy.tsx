import { View } from "react-native";
import LegalCard from "./LegalCard";
import { useLegalPrivacity } from "@/presentation/hooks/use-legal-privacity.hook";
import { LegalCardLoading } from "./LegalCardLoading";

export const LegalPrivacy = () => {
  const { privacy, isLoadingPrivacy }: any = useLegalPrivacity();

  if (isLoadingPrivacy) {
    return <LegalCardLoading />;
  }

  const { title, lastUpdated, sections } = privacy.data;

  return (
    <View>
      <LegalCard title={title} lastUpdated={lastUpdated} sections={sections} />
    </View>
  );
};
