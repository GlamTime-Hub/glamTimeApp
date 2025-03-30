import { View } from "react-native";
import { useColorScheme } from "react-native";
import Svg, { Path } from "react-native-svg";

export const Google = ({ size = 24 }) => {
  const colorScheme = useColorScheme();
  const fillColor = colorScheme === "dark" ? "#000000" : "#FFFFFF";

  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <Path
          d="M31.6814 34.8868C29.7659 36.1768 27.3228 36.9586 24.43 36.9586C18.84 36.9586 14.0905 33.1863 12.39 28.1045V28.085C11.96 26.795 11.7059 25.4268 11.7059 24C11.7059 22.574 11.96 21.2058 12.39 19.915C14.0905 14.8332 18.84 11.0609 24.43 11.0609C27.5964 11.0609 30.4109 12.1554 32.6586 14.2664L38.8154 8.1096C35.0822 4.6305 30.2349 2.5 24.43 2.5C16.0255 2.5 8.7741 7.3277 5.2364 14.3641C3.7705 17.2568 2.93 20.5209 2.93 24C2.93 27.4791 3.7705 30.7432 5.2364 33.6359V33.6554C8.7741 40.6722 16.0255 45.5 24.43 45.5C30.235 45.5 35.1018 43.5845 38.6591 40.3004C42.7246 36.5477 45.07 31.0359 45.07 24.4881C45.07 22.9636 44.9332 21.4976 44.6791 20.0904H24.43V28.4168H36.0009C35.4927 31.0945 33.9682 33.3618 31.6814 34.8868Z"
          stroke={fillColor}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};
