// https://oxc.rs/docs/guide/usage/linter/config.html

import { defineConfig } from "oxlint";
import ExpoNativeConfig from "oxlint-config-universe/native";

export default defineConfig({
  extends: [ExpoNativeConfig],
});
