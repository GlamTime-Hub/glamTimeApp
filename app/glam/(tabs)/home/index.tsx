import { useNotificationsPush } from "@/hooks/use-notifications-push.hook";
import { Home } from "@/presentation/components/feature";

export default function HomeScreen() {
  const { expoPushToken, notification, channels } = useNotificationsPush();

  return <Home />;
}
