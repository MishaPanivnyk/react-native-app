import { Text, View, StyleSheet, Button,FlatList,Image,TouchableOpacity } from "react-native";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import db from "../../firebase/config";

export const ProfileScreen = () => {
 const[userPosts,setUserPosts]=useState([])
  useEffect(() => {getUserPosts()}, []);

  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={styles.container}>
            <TouchableOpacity onPress={signOut} style={styles.btnExit}>
        <Text>SING OUT</Text>
      </TouchableOpacity>
          <FlatList
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ marginHorizontal: 15, height: 240, width: 340 }}
            />
              <View>
              <Text style={styles.photoTitle}>{item.comment}</Text>
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
    alignItems: "center",
  },
  
  btnExit: {
    backgroundColor: "#FF6C00",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "roboto",
    marginBottom: 10,
    marginTop: 50,
    minWidth:400,
  },
  photoTitle: {
    textTransform: "uppercase",
    marginTop: 10,
    
   }
});

export default ProfileScreen;
