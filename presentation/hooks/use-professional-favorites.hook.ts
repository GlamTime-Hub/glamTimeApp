import { getProfessionalFavoritesAction } from "@/core/actions/professional/get-favorites.action";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export const useProfessionalFavorites = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["professionalFavorites"],
    queryFn: getProfessionalFavoritesAction,
    staleTime: 0,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return {
    professionals: data?.data ?? [],
    isLoading,
  };
};
