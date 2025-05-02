import { View } from "react-native";

import { Bell } from "@/lib/icons/Icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";

export const MyBusinessEmpty = () => {
  return (
    <Alert icon={Bell} variant="default" className="max-w-xl">
      <AlertTitle>Info!</AlertTitle>
      <AlertDescription>
        Aún no tienes negócios. Es momento de crear uno!!!
      </AlertDescription>
    </Alert>
  );
};
