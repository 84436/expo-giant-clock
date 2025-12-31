# Giant Clock

A giant 12-hour digital clock for Android. That's it.

Built with Expo SDK 58, with a bit of help from Claude Opus 5.5 on the `Inter_Digits` build script (requires `uv`) and the computed stylesheet. Oxc extension (`oxc.oxc-vscode`) is recommended if you're on VS Code.

Don't expect quality code lmao.

## Getting started

Assuming you have Node 26, npm 12 and the Android SDK ready on your box:

```sh
# Install npm dependencies
npm install

# Run in Expo Go
npm run dev

# Install Android SDK dependencies
# (you can skip this if you don't plan to build as APK)
android sdk install 'build-tools/36.0.0'
android sdk install 'build-tools/37.0.0'
android sdk install 'cmake/3.22.1'
android sdk install 'ndk/27.1.12297006'
android sdk install 'platforms/android-37.0'

# Build as APK
npm run prebuild
cd android
./gradlew assembleRelease
```

## Why???

i just wanna use my phone as a giant clock man
