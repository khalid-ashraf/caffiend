import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const initialState = {
  globalUser: null,
  globalData: null,
  isLoading: false,
};

// Async thunk for fetching user data from Firestore
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    let firebaseData = {};
    if (docSnap.exists()) {
      firebaseData = docSnap.data();
    }
    return firebaseData;
  }
);

// Thunk for setting up auth state listener
export const initializeAuthListener = () => (dispatch) => {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      dispatch(setGlobalUser(null));
      dispatch(setGlobalData(null));
      return;
    }

    dispatch(setGlobalUser(user));
    dispatch(fetchUserData(user.uid));
  });
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setGlobalUser: (state, action) => {
      state.globalUser = action.payload;
    },

    setGlobalData: (state, action) => {
      state.globalData = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logout: () => {
      signOut(auth);
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.globalData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Error");
      });
  },
});

export { signup, login };
export const { setGlobalUser, setGlobalData, setIsLoading, logout } =
  authSlice.actions;

export default authSlice;
