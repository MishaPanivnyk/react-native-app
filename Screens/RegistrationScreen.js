import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,

} from "react-native";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";

import { authSignUpUser } from "../redux/auth/authOperations";

const initialState = {
  nickname: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  const dispath = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.removeEventListener("change", onChange);
    // };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    dispath(authSignUpUser(state))
    setState(initialState);
  };
  const closeKeyboardBackdrop = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={closeKeyboardBackdrop}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../assets/images/bgimage.png")}
      >
         
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  ...styles.formInput,
                  paddingBottom: isShowKeyBoard ? 80 : 73,
                  width: dimensions,
                }}
              >
                <Text style={styles.formTitle}>Регистрация</Text>
                <TextInput
                  style={styles.input}
                  value={state.nickname}
                  textAlign={"left"}
                  placeholder={"Логин"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => setIsShowKeyBoard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, nickname: value }))
                  }
                />
                <TextInput
                  style={styles.input}
                  value={state.email}
                  textAlign={"left"}
                  placeholder={"Адрес электронной почты"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => setIsShowKeyBoard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <TextInput
                  style={styles.input}
                  value={state.password}
                  textAlign={"left"}
                  placeholder={"Пароль"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => setIsShowKeyBoard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                   secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={keyboardHide}>
                  <Text style={styles.btnText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                  <TouchableOpacity style={styles.textForm} onPress={() => navigation.navigate("Login") }>
                <Text >Уже есть аккаунт? Войти</Text>
              </TouchableOpacity>

              </View>
            </KeyboardAvoidingView>

      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({

  imageBackground: {
    flex: 1,
    resizeMode: "cover",
      justifyContent: "flex-end",
    alignItems: "center",
  },
  keyboardContainer: {
    flex: 1,
  },

  formTitle: {
    color: "#212121",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "roboto",
  },
  formInput: {
  justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 92,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    minWidth: 400,
  },

  input: {
    borderWidth: 1,
    height: 50,
    backgroundColor: "#F6F6F6",
    marginHorizontal: 16,
    borderColor: "#E8E8E8",
    padding: 16,
    color: "#212121",
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    borderRadius: 100,
    height: 51,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  btnText: {
    color: "#FFFFFF",
  },
  textForm: {
    color: "#1B4371",
  alignSelf:'center',
    marginBottom: 45,
    color: '#1B4371',
    fontWeight: 400,
    fontSize:16,

  },
});

export default RegistrationScreen;
