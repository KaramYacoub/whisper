import {
  View,
  Text,
  Dimensions,
  Pressable,
  ActivityIndicatorBase,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import useAuthSocial from "@/hooks/useSocialAuth";

const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
  const { loadingStrategy, handleSocialAuth } = useAuthSocial();

  return (
    <View className="flex-1 bg-surface">
      {/* TODO: animated orbs */}
      <View className="absolute inset-0 overflow-hidden">
        <SafeAreaView className="flex-1">
          {/* Top section - Branding */}
          <View className="items-center pt-10">
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 100, height: 100, marginVertical: -20 }}
              contentFit="contain"
            />
            <Text className="text-4xl font-bold text-primary font-serif tracking-wider uppercase">
              Whisper
            </Text>
          </View>

          {/* Center section - Hero Image */}
          <View className="flex-1 items-center justify-center px-6">
            <Image
              source={require("../../assets/images/auth.png")}
              style={{ width: width - 48, height: height * 0.3 }}
              contentFit="contain"
            />

            {/* Headline */}
            <View className="mt-6 items-center">
              <Text className="text-4xl font-bold text-foreground text-center font-serif">
                Connect & Chat
              </Text>
              <Text className="text-3xl font-bold text-primary font-serif">
                Seamlessly
              </Text>
            </View>

            {/* Auth Buttons */}
            <View className="mt-10 flex-row gap-4">
              {/* Google */}
              <Pressable
                className="flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.97]"
                disabled={loadingStrategy === "oauth_google"}
                onPress={() => handleSocialAuth("oauth_google")}
              >
                {loadingStrategy === "oauth_google" ? (
                  <ActivityIndicatorBase size="small" color="#1a1a1a" />
                ) : (
                  <>
                    <Image
                      source={require("../../assets/images/google.png")}
                      style={{ width: 20, height: 20 }}
                      contentFit="contain"
                    />
                    <Text className="text-sm font-semibold text-gray-900">
                      Google
                    </Text>
                  </>
                )}
              </Pressable>

              {/* Apple */}
              <Pressable
                className="flex-1 flex-row items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl border border-white/20 active:scale-[0.97]"
                disabled={loadingStrategy === "oauth_apple"}
                onPress={() => handleSocialAuth("oauth_apple")}
              >
                {loadingStrategy === "oauth_apple" ? (
                  <ActivityIndicatorBase size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                    <Text className="text-sm font-semibold text-foreground">
                      Apple
                    </Text>
                  </>
                )}
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};
export default AuthScreen;
