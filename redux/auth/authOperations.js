import db from "../../firebase/config";
import { authSlice } from "./authSlice";

const {updateUserProfile,authStateChange,authSignOut}= authSlice.actions

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email,password)
      const user = await db.auth().currentUser;
     await user.updateProfile({
        displayName:nickname,
      })
      const upload= await db.auth().currentUser
      const userUpdateProfile = {
        userId: upload.uid,
        nickname:upload.displayName,
     }

      dispatch(updateUserProfile(userUpdateProfile));
  
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log("userIn", user);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut())
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        nickname: user.displayName,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
