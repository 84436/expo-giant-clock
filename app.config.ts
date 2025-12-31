// https://docs.expo.dev/versions/latest/config/app/

import ExpoBuildProperties from "expo-build-properties/plugin";
import ExpoSplashScreen from "expo-splash-screen/plugin";
import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Giant Clock",
  slug: "giant-clock",
  version: "1",
  runtimeVersion: "58",
  platforms: ["android"],
  orientation: "landscape",
  userInterfaceStyle: "dark",
  android: {
    package: "localhost.giantclock",
    adaptiveIcon: {
      backgroundImage: "assets/icons/android-icon-background.png",
      foregroundImage: "assets/icons/android-icon-foreground.png",
      monochromeImage: "assets/icons/android-icon-monochrome.png",
    },
  },
  experiments: {
    reactCompiler: true,
  },

  // Prebuild
  plugins: [
    ExpoBuildProperties({
      android: {
        buildArchs: ["arm64-v8a"],
        enableMinifyInReleaseBuilds: true,
        enableShrinkResourcesInReleaseBuilds: true,
        gifEnabled: false,
        webpEnabled: false,
      },
    }),
    ExpoSplashScreen({
      backgroundColor: "#000000",
      image: "assets/images/black.png",
      imageWidth: 0,
    }),
  ],
};

export default config;
