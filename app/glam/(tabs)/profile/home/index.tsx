import { User } from "@/core/interfaces/user.interface";
import {
  Profile,
  ProfileLoading,
  ProfileWelcome,
} from "@/presentation/components/feature";
import { useProfileHome } from "@/presentation/hooks";

export default function HomeScreen() {
  const {
    session,
    user,
    isLoading,
    isProfessional,
    handleOptions,
    onLogout,
    updateImage,
  } = useProfileHome();

  if (isLoading) return <ProfileLoading />;

  if (!session || !user) return <ProfileWelcome />;

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
