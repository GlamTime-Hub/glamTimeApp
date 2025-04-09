import { View, ScrollView } from "react-native";
import { Skeleton } from "@/presentation/components/ui/skeleton";

export const LegalCardLoading = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="px-4 pt-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/3 mb-6" />

        {[...Array(6)].map((_, index) => (
          <View key={index} className="mb-6">
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-11/12 mb-1" />
            <Skeleton className="h-4 w-10/12" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
