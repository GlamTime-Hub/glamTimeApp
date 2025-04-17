import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useLocation } from "./use-location.hook";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBusinessTypes } from "./use-business-types.hook";

const schema = z.object({
  name: z.string(),
  city: z.string(),
  category: z.string(),
  businessType: z.string(),
});

type FormData = z.infer<typeof schema>;

export const useBusinessFilter = () => {
  const { cities } = useLocation("67e6ff31e035edd4d7bc6cf0"); //colombia

  const insets = useSafeAreaInsets();

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 15,
    right: 107,
  };

  const { control, handleSubmit } = useForm<FormData>({
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
    console.log(data);
  };

  return {
    control,
    contentInsets,
    businessTypes,
    cateogries,
    cities,
    handleSubmit,
    onSubmit,
  };
};
