import { getBusinessByIdAction } from "@/core/actions/business/get-business-by-id.action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { useState } from "react";
import { newBusinessReviewAction } from "@/core/actions/business/new-business-review.action";
import { useUserStore } from "../store/use-user.store";
import Toast from "react-native-toast-message";

const staleTime = 1000 * 60 * 60 * 24;
type FormData = z.infer<typeof schema>;

const schema = z.object({
  feedback: z
    .string()
    .nonempty("Dejanos un comentario")
    .max(100, "Máximo 100 caracteres"),
});

export const useBusinessFeedback = () => {
  const { id, bookingId } = useLocalSearchParams();

  const [rating, setRating] = useState(0);
  const [errorRating, setErrorRating] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      feedback: "",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["business", id],
    queryFn: () => getBusinessByIdAction(id as string),
    staleTime,
    enabled: !!id,
  });

  const queryClient = useQueryClient();

  const onSubmit = async (data: FormData) => {
    if (rating === 0) {
      setErrorRating(true);
      return;
    }

    setLoading(true);

    const review = {
      userId: user?.id,
      bookingId,
      businessId: id,
      rating,
      review: data.feedback,
    };

    await newBusinessReviewAction(review);

    queryClient.invalidateQueries({ queryKey: ["bookings"] });

    setLoading(false);

    Toast.show({
      type: "success",
      text1: "Gracias por tu reseña",
      text2: "Tu opinión es muy importante para nosotros.",
    });

    router.back();
    reset();
  };

  return {
    control,
    favorite,
    errors,
    errorRating,
    business: data?.data,
    isLoading,
    rating,
    loading,
    setLoading,
    setFavorite,
    handleSubmit,
    onSubmit,
    setRating,
  };
};
