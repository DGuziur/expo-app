import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useFirstLaunch() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const settings = await AsyncStorage.getItem("globalSettings");
      const hasSeenIntro = settings ? JSON.parse(settings).greetedGowi : false;
      setIsFirstLaunch(!hasSeenIntro);
    } catch {
      setIsFirstLaunch(false);
    } finally {
      setLoading(false);
    }
  };

  return { isFirstLaunch, loading };
}
