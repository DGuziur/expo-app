import { Stack } from "expo-router";

export default function AuthRoutesLayout() {
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //     setLoading(false);
  //   });
  //   return unsubscribe;
  // }, []);

  // if (loading)
  //   return <Spinner size={60} color="#FF6B6B" strokeWidth={6}></Spinner>;

  // if (user) return <Redirect href={"/(tabs)"} />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
