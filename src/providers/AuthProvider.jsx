import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import {
  setGlobalUser,
  setIsLoading,
  fetchUserData,
} from "../state/userAuthSlice";
import { useUserAuth } from "../state/store";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("User: ", user);
      dispatch(setGlobalUser(user));

      // If there is not user, empty the user state and return from this listener.
      if (!user) {
        console.log("No active user");
        return;
      }

      // if there is a user, then check if the user has data in the database, and if they do , then fetch said data and update the global state.
      try {
        dispatch(setIsLoading(true));
        dispatch(fetchUserData(user.uid));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    });

    return unsubscribe;
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
