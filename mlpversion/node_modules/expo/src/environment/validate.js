import {
  NativeModules,
  // React Native's internal InitializeCore module sets up `window` but runs only when its React
  // renderer is loaded. We can cause this by loading one of its dependents.
  findNodeHandle, // eslint-disable-line no-unused-vars
  YellowBox,
} from 'react-native';

findNodeHandle; // eslint-disable-line no-unused-expressions

if (!NativeModules.ExponentConstants) {
  throw new Error(
    `The Expo SDK requires Expo to run. It appears the native Expo modules are unavailable and this code is not running on Expo. Visit https://docs.expo.io to learn more about developing an Expo project.`
  );
}

// ignore annoying deprecation warnings stemming from react-native JS internals
// TODO: remove this once there are no more calls to isMounted() in react-native
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
