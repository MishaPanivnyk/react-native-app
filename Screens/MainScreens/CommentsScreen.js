import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import db from "../../firebase/config";
import { useSelector } from "react-redux";

export const ComentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { postId } = route.params;
  const { nickname } = useSelector((state) => state.auth);

  const createComments = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickname });
  };
  const getAllComments = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
       setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };
  useEffect(() => {
    getAllComments();
    console.log('comment', comment)
    console.log('allComents',allComments.length)
  }, [comment]);
  return (
    <View style={styles.container}>
   
        <SafeAreaView>
        <FlatList
          data={allComments}
            keyExtractor={(item)=>item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.author}>{item.nickname}</Text>
              <Text style={styles.textComment}>{item.comment}</Text>
            </View>
          )}
          />
        </SafeAreaView>
    
      <TextInput
        style={styles.input}
        textAlign={"left"}
        placeholder={"Комментировать..."}
        placeholderTextColor={"#BDBDBD"}
        onChangeText={setComment}
      />
      <TouchableOpacity onPress={createComments} style={styles.button}>
        <Text style={styles.btnText}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  // containerData: {
  //   flex: 1,
  // },
  commentContainer: {
   marginBottom:24,
    borderColor:"#000",
    borderWidth:1,
    padding:5
  },
  button: {
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "transparent",

    height: 51,
    marginHorizontal: 16,
    marginBottom: 16,
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
    color: "#BDBDBD",
    marginBottom: 16,
  },
  author: {
    fontFamily: "roboto",
    textTransform: 'uppercase',
    color: 'orange',
  
  },
  textComment: {
    fontFamily: 'roboto',
    fontSize: 18,
     backgroundColor:"orange",
    minHeight:30,
    
  },
});

export default ComentsScreen;
