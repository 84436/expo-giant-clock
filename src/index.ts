import { App } from "@/App";
import { registerRootComponent } from "expo";
import { preventAutoHideAsync } from "expo-splash-screen";

preventAutoHideAsync();
registerRootComponent(App);
