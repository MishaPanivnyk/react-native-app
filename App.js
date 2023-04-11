

import { useState, useEffect, useCallback } from "react";


import { Provider } from "react-redux";
import { store } from "./redux/store";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Home from "./Screens/Home";
import { View,Text } from "react-native";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [isReady, setIsReady] = useState(false);
  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await Font.loadAsync({
  //         roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  //       });
  //     } catch (error) {
  //       console.warn(error);
  //     } finally {
  //       setIsReady(true);
  //     }
  //   }
  //   prepare();
  // }, []);

 
  // const onLayoutRootView = useCallback(async () => {
  //   if (isReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [isReady]);

  // if (!isReady) {
  //   return null;
  // }
  return (
    <Provider store={store}>
    <Home /> 
      </Provider>
  );
}
