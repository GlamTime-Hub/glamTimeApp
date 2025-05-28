import { Text } from "@/presentation/components/ui/text";
import { FlatList, View } from "react-native";
import { BusinessOrder } from "./BusinessOrder";
import BusinessCard from "./BusinessCard";
import { BusinessFilter } from "./BusinessFilter";
import { useBusiness } from "@/presentation/hooks";
import { BusinessContentLoading } from "./BusinessContentLoading";
import { LoadingIndicator } from "../shared/LoadingIndicator";

interface Props {
  drawerRef: React.RefObject<any>;
}

export const BusinessContent = ({ drawerRef }: Props) => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useBusiness();

  const businesses = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return <BusinessContentLoading />;
  }

  return (
    <View className="p-2 flex-1">
      <Text className="font-baloo-bold text-center my-2">
        Usa los filtros y encuentra justo lo que buscas.
      </Text>

      <View className="mt-4 flex-row items-center justify-between">
        <BusinessFilter callback={() => drawerRef.current?.openDrawer()} />
        <BusinessOrder />
      </View>
      <View className="flex-1 px-4">
        <FlatList
          data={businesses}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BusinessCard
              business={{
                id: item.id,
                name: item.name,
                imageUrl: item.urlPhoto,
                rating: item.rating,
                likes: item.likes,
                receivedReviews: item.receivedReviews,
                totalBooking: item.totalBooking,
              }}
            />
          )}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <LoadingIndicator /> : null}
        />
      </View>
    </View>
  );
};
