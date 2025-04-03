import { Profile, ProfileWelcome } from "@/presentation/components/feature";

export default function HomeScreen() {
  const loginValidation = true;

  if (!loginValidation) return <ProfileWelcome />;

  return <Profile />;
}
