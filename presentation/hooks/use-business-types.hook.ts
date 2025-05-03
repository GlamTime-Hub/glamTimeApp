import { getBusinessTypeAction } from "@/core/actions/util/get-business-type.action";
import { getCategoriesByBusinessTypeAction } from "@/core/actions/util/get-categories-by-business-type.action";
import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60 * 24;
export const useBusinessTypes = (
  includeCategories: boolean = false,
  businessType?: string
) => {
  const { data: businessTypes } = useQuery({
    queryKey: ["businessType"],
    queryFn: getBusinessTypeAction,
    staleTime,
  });

  const { data: cateogries } = useQuery({
    queryKey: ["categories", businessType],
    queryFn: () => getCategoriesByBusinessTypeAction(businessType!),
    staleTime,
    enabled: includeCategories && !!businessType,
  });

  return {
    businessTypes: businessTypes?.data,
    cateogries: cateogries?.data,
  };
};
