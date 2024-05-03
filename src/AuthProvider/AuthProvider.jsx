import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./../firebase/Firebase.config";

export const authContex = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // create euser
  const createUser = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const loginUser = (email, pass) =>{
    return signInWithEmailAndPassword(auth, email, pass)
  }

  const logOut = () =>{
    return signOut(auth)
  }

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => subscribe();
  }, []);

  const authInfo = { user, createUser, loginUser, logOut };
  return (
    <div>
      <authContex.Provider value={authInfo}>{children}</authContex.Provider>
    </div>
  );
};

export default AuthProvider;
