import { useAuth } from "@clerk/clerk-expo";

import { Pressable, ScrollView, Text } from "react-native";
const ProfileTab = () => {
  const { signOut } = useAuth();
  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-white">Profile</Text>

      <Pressable onPress={() => signOut()}>
        <Text className="text-white">Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
};
export default ProfileTab;
