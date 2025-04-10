import { View, ScrollView } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Skeleton } from "@/presentation/components/ui/skeleton";

export const MyReviewsLoading = () => {
  return (
    <Card className="m-4 flex-1">
      <CardContent className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          {[...Array(4)].map((_, index) => (
            <View key={index} className="flex flex-row items-start my-4 w-full">
              <Skeleton className="h-10 w-10 rounded-full" />

              <View className="flex-1 ml-4">
                <View className="flex flex-row justify-between items-center w-full">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </View>

                <Skeleton className="h-4 w-full mt-2 rounded-md" />
              </View>
            </View>
          ))}
        </ScrollView>
      </CardContent>
    </Card>
  );
};
