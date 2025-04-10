import { User } from "@/core/interfaces/user.interface";
import {
  Error,
  Profile,
  ProfileLoading,
  ProfileWelcome,
} from "@/presentation/components/feature";
import { useProfileHome } from "@/presentation/hooks";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const {
    session,
    user,
    isLoading,
    isError,
    error,
    isProfessional,
    handleOptions,
    onLogout,
    updateImage,
  } = useProfileHome();

  if (!session) return <ProfileWelcome />;

  if (isLoading) return <ProfileLoading />;

  if (isError) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error?.message,
    });

    return <Error />;
  }

  return (
    <Profile
      user={user as User | undefined}
      isProfessional={isProfessional}
      handleOptions={handleOptions}
      onLogout={onLogout}
      updateImage={updateImage}
    />
  );
}
