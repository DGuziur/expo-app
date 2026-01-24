export default {
  expo: {
    name: "gowi",
    slug: "mood-app",
    version: "1.0.6",
    orientation: "portrait",
    icon: "./assets/images/GowiAppIcon.png",
    scheme: "noteapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON_IOS ?? "./GoogleService-Info.plist",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
      bundleIdentifier: "com.expoapp.moodapp",
      supportsTablet: true,
    },
    android: {
      package: "com.expoapp.moodapp",
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/GowiAppIcon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      navigationBar: {
        backgroundColor: "#00000000",
        barStyle: "dark-content",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    updates: {
      url: "https://u.expo.dev/29513e06-49ed-4ff6-be29-4f471629c05b",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "react-native-edge-to-edge",
        {
          android: {
            enforceNavigationBarContrast: false,
          },
        },
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "29513e06-49ed-4ff6-be29-4f471629c05b",
      },
    },
    owner: "dguziur",
  },
};
