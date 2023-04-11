import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import PostsScreen from "./Screens/MainScreens/PostsScreen";
import CreatePostsScreen from "./Screens/MainScreens/CreatePostsScreen";
import ProfileScreen from "./Screens/MainScreens/ProfileScreen";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={RegistrationScreen}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: '#ffffff' }}
      screenOptions={{tabBarColor: 'red'} } >
      <Tab.Screen
    options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name="postage-stamp"
              size={24}
              color={color}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
  
      />
      <Tab.Screen
      options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="pluscircleo" size={24} color={color} />
          ),
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <Tab.Screen
      options={{
          tabBarIcon: ({ focused, size, color }) => (
          <AntDesign name="profile" size={24}
            color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
