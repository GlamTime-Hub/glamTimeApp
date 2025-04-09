import { View } from "react-native";
import LegalCard from "./LegalCard";
import { useLegalPrivacity } from "@/presentation/hooks/use-legal-privacity.hook";
import { LegalCardLoading } from "./LegalCardLoading";

export const LegalTerms = () => {
  const { terms, isLoadingTerms }: any = useLegalPrivacity();

  if (isLoadingTerms) {
    return <LegalCardLoading />;
  }

  const { title, lastUpdated, sections } = terms.data;

  return (
    <View>
      <LegalCard title={title} lastUpdated={lastUpdated} sections={sections} />
    </View>
  );
};
