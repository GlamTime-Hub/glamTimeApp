import { useEffect } from "react";
import { OneSignal, LogLevel } from "react-native-onesignal";
export const useNotificationPush = () => {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize("290dddf2-e0dd-4b9c-8329-d1d4de1cf63c");
    OneSignal.Notifications.requestPermission(false);
  }, []);
};
