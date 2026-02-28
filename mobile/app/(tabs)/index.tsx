import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatTab = () => {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView className="flex-1" contentInsetAdjustmentBehavior="automatic">
        <Text className="text-white">index</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ChatTab;
