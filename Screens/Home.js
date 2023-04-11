import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "../router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useCallback,useState } from "react";
import {authStateCahngeUser} from '../redux/auth/authOperations'
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";


SplashScreen.preventAutoHideAsync();
const Home = () => {
    const [isReady, setIsReady] = useState(false);

    const dispatch = useDispatch()
    
  const {stateChange} = useSelector((state) => state.auth);

    const routing = useRoute(stateChange);
    
    useEffect(() => {
      dispatch(authStateCahngeUser())
      async function prepare() {
      try {
        await Font.loadAsync({
          roboto: require("../assets/fonts/Roboto-Regular.ttf"),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setIsReady(true);
      }
    }
    prepare();

  }, []);
    const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
    }, [isReady]);
  
    if (!isReady) {
    return null;
  }


  return (
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
         {routing}
      </View>
     
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Home;