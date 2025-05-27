import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "@/presentation/components/ui/text";

type Section = {
  title: string;
  content: string;
};

type Props = {
  title: string;
  lastUpdated: string;
  sections: Section[];
};

const LegalCard = ({ title, lastUpdated, sections }: Props) => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="px-4 pt-6">
        <Text className="text-xl font-baloo-bold mb-1">{title}</Text>
        <Text className="text-xs text-muted-foreground mb-5">
          {lastUpdated}
        </Text>

        {sections.map((section, index) => (
          <View key={index} className="mb-6">
            <Text className="text-base font-semibold mb-1">
              {section.title}
            </Text>
            <Text className="text-sm text-zinc-500 leading-6">
              {section.content}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default LegalCard;
