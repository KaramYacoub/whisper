import { useAuthCallback } from "@/hooks/useAuth";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useRef } from "react";
import * as Sentry from "@sentry/react-native";

const AuthSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate: syncUser } = useAuthCallback();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!hasSynced.current && isSignedIn && user) {
      hasSynced.current = true;
      syncUser(undefined, {
        onSuccess: (data) => {
          console.log("User synced with backend:", data.name);
          Sentry.logger.info(
            Sentry.logger.fmt`User synced with backend: ${data.name}`,
            { userId: data.id, userName: data.name },
          );
        },
        onError: (error) => {
          console.error("Error syncing user with backend:", error.message);
          Sentry.logger.error("Failed to sync user with backend", {
            error: error instanceof Error ? error.message : String(error),
          });
        },
      });
    }
    if (!isSignedIn) {
      hasSynced.current = false;
    }
  }, [isSignedIn, user, syncUser]);
  return null;
};

export default AuthSync;
