import { TouchableOpacity } from "react-native";
import { Text } from "@/presentation/components/ui/text";
import { ListFilter } from "@/lib/icons/Icons";

interface Props {
  callback: () => void;
}
export const BusinessFilter = ({ callback }: Props) => {
  return (
    <TouchableOpacity className="flex flex-row gap-2 ml-4" onPress={callback}>
      <ListFilter className="text-foreground" size={25} />
      <Text>Filtrar</Text>
    </TouchableOpacity>
  );
};
