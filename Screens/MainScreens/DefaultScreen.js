import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import db from "../../firebase/config";
import { EvilIcons } from "@expo/vector-icons";

const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOut} style={styles.btnExit}>
        <Text>SING OUT</Text>
      </TouchableOpacity>
      {/* <Button title="singOut" onPress={signOut} style={styles.btnExit}/> */}

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={{ uri: item.photo }} style={styles.image} />
            <View>
              <Text style={styles.photoTitle}>{item.comment}</Text>
            </View>
            {/* <View style={styles.btnContainer}>
              <Button
                title="go to map"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              <Button
                title="go to Comments"
                onPress={() =>
                  navigation.navigate("Комментарии", { postId: item.id })
                }
              />
            </View> */}
            <View style={{ flex: 1, flexDirection: "row",marginHorizontal:20,}}>
              <View >
                <EvilIcons
                  onPress={() =>
                    navigation.navigate("Комментарии", {
                      postId: item.id,
                      photo: item.photo,
                    })
                  }
                  name="comment"
                  size={32}
                  color="orange"
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  
                }}
              >
                <EvilIcons onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  } name="location" size={32} color="orange" />
            
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    marginHorizontal: 15,
    height: 240,
    width: 340,
    marginBottom: 10,
  },

  btnExit: {
    backgroundColor: "#FF6C00",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "roboto",
    marginBottom: 10,
  },
  photoTitle: {

    textTransform: "uppercase",
    marginBottom: 10,
    marginHorizontal: -165,
   
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
  },
});

export default DefaultScreen;
