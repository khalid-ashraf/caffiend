import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setIsRegisteration,
  setEmail,
  setPassword,
  setIsAuthenticating,
  handleSubmit,
} from "../state/authSlice";
import { useAuth } from "../state/store";

const Authentication = () => {
  const { isRegisteration, email, password, isAuthenticating } = useAuth();
  const dispatch = useDispatch();

  // const {signUp}

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleAuthenticate = async () => {
    if (!email || !email.includes("@") || !password || !password.length < 6) {
      return;
    }

    // if(isRegisteration) {

    // } else
  };

  return (
    <>
      <h2 className='sign-up-text'>{isRegisteration ? "Sign up" : "Login"}</h2>

      <p>Sign in to your account!</p>
      <input
        type='email'
        ref={emailRef}
      />
      <input
        type='password'
        placeholder='********'
        ref={passwordRef}
      />
      <button
        onClick={() => {
          dispatch(
            handleSubmit({
              email: emailRef.current.value,
              password: passwordRef.current.value,
            })
          );
        }}
      >
        Submit
      </button>

      <hr />

      <div className='register-content'>
        <p>
          {isRegisteration
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button onClick={() => dispatch(setIsRegisteration(!isRegisteration))}>
          <p>{isRegisteration ? "Sign in" : "Sign up"}</p>
        </button>
      </div>
    </>
  );
};
export default Authentication;
