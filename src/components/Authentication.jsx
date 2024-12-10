import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setIsRegistration,
  setEmail,
  setPassword,
  setIsAuthenticating,
  handleSubmit,
} from "../state/formInputSlice";
import { useFormInput } from "../state/store";
import { signup, login } from "../state/authSlice";
import { handleCloseModal } from "../state/modalSlice";

const Authentication = () => {
  const { isRegistration, email, password, isAuthenticating } = useFormInput();
  const dispatch = useDispatch();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleAuthenticate = async () => {
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    try {
      dispatch(setIsAuthenticating(true));

      if (isRegistration) {
        await signup(emailValue, passwordValue);
      } else {
        await login(emailValue, passwordValue);
      }

      dispatch(handleCloseModal());
    } catch (error) {
      alert("Invalid email or password! Try again.");
    } finally {
      dispatch(setIsAuthenticating(false));
    }
  };

  return (
    <>
      <h2 className='sign-up-text'>{isRegistration ? "Sign up" : "Login"}</h2>

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
      <button onClick={handleAuthenticate}>
        {isAuthenticating ? "Authenticating..." : "Submit"}
      </button>

      <hr />

      <div className='register-content'>
        <p>
          {isRegistration
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button onClick={() => dispatch(setIsRegistration(!isRegistration))}>
          <p>{isRegistration ? "Sign in" : "Sign up"}</p>
        </button>
      </div>
    </>
  );
};
export default Authentication;
