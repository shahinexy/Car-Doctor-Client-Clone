import { useContext } from "react";
import { authContex } from "../AuthProvider/AuthProvider";

const useAuth = () => {
    const auth = useContext(authContex)
    return auth;
};

export default useAuth;