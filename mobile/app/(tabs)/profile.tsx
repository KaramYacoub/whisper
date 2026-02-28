import { useAuth } from "@clerk/clerk-expo";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView className="flex-1" contentInsetAdjustmentBehavior="automatic">
        <Text className="text-white">Profile</Text>

        <Pressable onPress={() => signOut()}>
          <Text className="text-white">Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileTab;
