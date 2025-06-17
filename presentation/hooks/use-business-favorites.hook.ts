import { getBusinessFavoritesAction } from "@/core/actions/business/get-favorites.action";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export const useBusinessFavorites = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["businessFavorites"],
    queryFn: getBusinessFavoritesAction,
    staleTime: 0,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return {
    business: data?.data ?? [],
    isLoading,
  };
};
