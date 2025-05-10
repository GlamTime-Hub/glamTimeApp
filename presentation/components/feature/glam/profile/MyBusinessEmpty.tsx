import { CustomAlert } from "@/presentation/components/ui/CustomAlert";

export const MyBusinessEmpty = () => {
  return (
    <CustomAlert
      title="Info!!!"
      description="Aún no tienes negócios. Es momento de crear uno."
      type="info"
    />
  );
};
