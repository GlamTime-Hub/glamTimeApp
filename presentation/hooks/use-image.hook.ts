import { useState } from "react";
import * as FileSystem from "expo-file-system";
import Supabase from "@/core/api/supabase.api";
import Toast from "react-native-toast-message";
import { Buffer } from "buffer";

const getMimeType = (ext: string): string => {
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "heic":
      return "image/heic";
    case "webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
};

export const useImage = (
  isUserImage: boolean,
  id: string,
  defaultImage: string
) => {
  const [image, setImage] = useState<string>(defaultImage);

  const onUpdateImage = async (uri: string) => {
    console.log("amigooo");

    const imageFromFyleSystem = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });

    try {
      const blob = Buffer.from(imageFromFyleSystem, "base64");
      const ext = uri.split(".").pop()?.toLowerCase();
      const contentType = getMimeType(ext!);

      const bucketName = isUserImage ? "user-images" : "business-images";

      const { error } = await Supabase.storage
        .from(bucketName)
        .upload(`${id}.${ext}`, blob, { contentType, upsert: true });

      const {
        data: { publicUrl },
      } = await Supabase.storage.from(bucketName).getPublicUrl(`${id}.${ext}`);

      if (error || !publicUrl) {
        console.error("Error uploading image:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudo subir la imagen",
        });
        return null;
      }

      return publicUrl;
    } catch (error) {
      console.error("Error converting to blob:", error);
    }
  };

  return {
    image,
    setImage,
    onUpdateImage,
  };
};
