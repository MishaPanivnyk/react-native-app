import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import { useState,useEffect } from "react";
import * as Location from "expo-location";
import db from "../../firebase/config";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";


export const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState(null);
 const {userId,nickname}=useSelector((state)=>state.auth)

    useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== 'granted') {
       console.log('Permission to access location was denied')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const takePicture = async () => {
    const { uri } = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhoto(uri);

  };
  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("Публикации");
 
  };

  const uploadPostToServer = async () => {
      const photo = await uploadPhotoToServer();
    const createPost = await db.firestore().collection('posts').add({
      photo,comment,location:location.coords,userId,nickname
    })
  }

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = nanoid();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);
    const processesPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();
    return processesPhoto;
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ width: 120, height: 120 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePicture} style={styles.photo} >
         <Feather name="camera" size={32} color="black"  />
        </TouchableOpacity>

      </Camera>
      <Text style={styles.downloadText}>Загрузите фото</Text>
      <TextInput
        style={styles.input}
        textAlign={"left"}
        placeholder={"Название..."}
        placeholderTextColor={"orange"}
        onChangeText={setComment}
      />
      {/* <Text>{location}</Text> */}
      <TouchableOpacity onPress={sendPhoto} style={styles.button}>
        <Text style={styles.btnText}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  camera: {
    height: 300,
    marginHorizontal: 16,
    marginTop: 104,
    alignItems: "center",
    justifyContent: 'center',
 
 
  },
  photo:{  width: 60,
    height: 50,
    backgroundColor: "rgba(200, 195, 196, 0.37)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,},
 
  downloadText: {
    marginTop: 8,
    marginHorizontal: 16,
    color: "#BDBDBD",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 150,
    borderWidth: 1,
    borderColor: "transparent",

    height: 51,
    marginHorizontal: 16,
  },
  btnText: {
    color: "orange",
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 2,
    height: 50,

    marginHorizontal: 16,
    borderColor: "orange",
    padding: 16,
    paddingLeft: 0,
    color: "black",
    marginTop: 32,
  },
});

export default CreatePostsScreen;

