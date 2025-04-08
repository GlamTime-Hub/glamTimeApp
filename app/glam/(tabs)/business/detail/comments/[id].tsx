import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { BusinessProfessionalComments } from "@/presentation/components/feature";

export default function CommentsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <Card className="m-4 flex-1">
      <CardContent className="flex-1">
        <BusinessProfessionalComments />
      </CardContent>
    </Card>
  );
}
