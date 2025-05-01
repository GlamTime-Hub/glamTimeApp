import { User } from "@/core/interfaces/user.interface";
import { Profile, ProfileWelcome } from "@/presentation/components/feature";
import { useProfileHome } from "@/presentation/hooks";

export default function HomeScreen() {
  const {
    session,
    user,
    isProfessional,
    handleOptions,
    onLogout,
    updateImage,
  } = useProfileHome();

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
