import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "./DefaultScreen";
import MapScreen from "./MapScreen";
import ComentsScreen from "./CommentsScreen";


const Stack = createStackNavigator();
const PostsScreen = () => {
  return (
     <Stack.Navigator>
        <Stack.Screen
          name="Публикации"
        component={DefaultScreen} />
        <Stack.Screen
          name='Map'
          component={MapScreen}
        />
        <Stack.Screen
          name="Комментарии"
          component={ComentsScreen}
        />
            </Stack.Navigator>
  );
};


export default PostsScreen;
