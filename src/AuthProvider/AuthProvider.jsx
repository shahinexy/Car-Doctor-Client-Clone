import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./../firebase/Firebase.config";
import axios from "axios";

export const authContex = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  // create euser
  const createUser = (email, pass) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const loginUser = (email, pass) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const logedUser = { email: userEmail };
      setUser(currentUser);
      setLoader(false);
      console.log(currentUser);
      // if user exist then use a token
      if (currentUser) {
        axios
          .post("https://car-doctor-server-shahins-projects-02817491.vercel.app/jwt", logedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("token responce", res.data);
          });
      } else {
        axios.post("https://car-doctor-server-shahins-projects-02817491.vercel.app/logout", logedUser, {
          withCredentials: true,
        })
        .then(res => {
          console.log(res.data);
        })
      }
    });
    return () => subscribe();
  }, [user]);

  const authInfo = { user, createUser, loginUser, logOut, loader };
  return (
    <div>
      <authContex.Provider value={authInfo}>{children}</authContex.Provider>
    </div>
  );
};

export default AuthProvider;
