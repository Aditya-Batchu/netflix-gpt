import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { NETFLIX_BACKGROUND, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [signInError, setSignInError] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleSignInForm = () => {
    const Email = email.current?.value || "";
    const Password = password.current?.value || "";
    const Name = name.current?.value || "";

    const isSignUp = !isSignInForm;
    const msg = checkValidData(Email, Password, Name, isSignUp);
    setSignInError(msg);

    if (msg) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: Name,
            photoURL:USER_AVATAR ,
          })
            .then(() => {
              console.log(user);
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              setSignInError(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setSignInError(errorCode + "  -  " + errorMessage);
        });
    } else {
      // Sign in logic
      signInWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "   --   " + errorMessage);
        });
    }

    // if (!msg) {
    //   // Sign In / Sign Up logic here (e.g., API call)

    // }
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={NETFLIX_BACKGROUND}
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-4/12 absolute p-14 my-[100px] mx-auto right-0 left-0 text-white rounded-md bg-black opacity-85"
      >
        <p className="text-5xl font-bold my-6 text-white">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </p>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Enter your name"
            className="p-4 my-2 w-full bg-slate-900 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email or mobile number"
          className="p-4 my-2 w-full bg-slate-900 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-slate-900 rounded-lg"
        />
        <p className="text-red-600 font-bold text-lg py-2">{signInError}</p>
        <button
          type="submit"
          className="text-2xl bg-red-600 w-full my-2 p-2 rounded-lg"
          onClick={handleSignInForm}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="w-full my-2 p-2 text-center">OR</p>
        <button
          type="button"
          className="my-2 p-2 bg-stone-500 text-center font-bold w-full rounded-lg"
        >
          Use a sign-in code
        </button>
        <p className="underline w-full text-center my-2">Forget password?</p>
        <div className="my-2">
          <label>
            <input type="checkbox" />
            <span className="mx-4 w-full">Remember me</span>
          </label>
        </div>
        <button type="button" className="my-2" onClick={toggleSignInForm}>
          <span className="font-bold">
            {isSignInForm
              ? "New to Netflix? Sign Up"
              : "Already Registered? Sign In Now.."}
          </span>
        </button>
      </form>
    </div>
  );
};

export default Login;
