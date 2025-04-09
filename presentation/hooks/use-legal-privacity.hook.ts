import { getPrivacyAction } from "@/core/actions/util/get-privacy.action";
import { getTermsAction } from "@/core/actions/util/get-terms.action";
import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60 * 24;

export const useLegalPrivacity = () => {
  const { data: privacy, isLoading: isLoadingPrivacy } = useQuery({
    queryKey: ["legal", "privacy"],
    queryFn: getPrivacyAction,
    staleTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: terms, isLoading: isLoadingTerms } = useQuery({
    queryKey: ["legal", "terms"],
    queryFn: getTermsAction,
    staleTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    privacy,
    terms,
    isLoadingPrivacy,
    isLoadingTerms,
  };
};
