import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useLocation } from "./use-location.hook";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBusinessTypes } from "./use-business-types.hook";
import { useBusinessFilterStore } from "../store/use-filter-business.store";
import { useUserStore } from "../store/use-user.store";

const schema = z.object({
  name: z.string(),
  city: z.string(),
  category: z.string(),
  businessType: z.string(),
});

type FormData = z.infer<typeof schema>;

export const useBusinessFilter = () => {
  const { setFilter } = useBusinessFilterStore();
  const { user } = useUserStore();

  const { cities } = useLocation("67e6ff31e035edd4d7bc6cf0"); //colombia

  const insets = useSafeAreaInsets();

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 15,
    right: 107,
  };

  const { control, handleSubmit, reset, resetField } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      businessType: "",
      city: "",
      category: "",
    },
  });

  const businessType = useWatch({
    control,
    name: "businessType",
  });

  const { businessTypes, cateogries } = useBusinessTypes(true, businessType);

  const onSubmit = (data: FormData) => {
    setFilter({
      city: data.city,
      name: data.name,
      category: data.category,
      businessType: data.businessType,
    });
  };

  const onResetFilters = () => {
    reset({
      businessType: undefined,
    });

    if (user) {
      const city = user?.city ?? "";
      const country = user?.country ?? "";
      setFilter({
        name: "",
        businessType: "",
        category: "",
        city,
        country,
      });
      return;
    }

    setFilter({
      city: "",
      name: "",
      category: "",
      businessType: "",
    });
  };

  return {
    control,
    contentInsets,
    businessTypes,
    cateogries,
    cities,
    handleSubmit,
    onSubmit,
    onResetFilters,
  };
};
