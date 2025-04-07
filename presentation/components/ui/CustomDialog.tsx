import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
import { Button } from "./button";
import { Text } from "./text";
import { View } from "react-native";

interface Props {
  title: string;
  isIcon: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  closeLabel: string;
  callback?: () => void;
}

export const CustomDialog = ({
  isIcon,
  title,
  children,
  icon,
  closeLabel,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {!isIcon ? (
          <Button variant="default">
            <Text className="font-bold">{title}</Text>
          </Button>
        ) : (
          <Button variant="ghost" size={"icon"}>
            <Text className="font-bold">{icon}</Text>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="py-4">{children}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} className="flex flex-row gap-2">
              <Text>{closeLabel}</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
