import { useContext } from "react";
import { authContex } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivetRoute = ({ children }) => {
  const { user , loader} = useContext(authContex);
  if(user){
    return children;
  }
  if (loader) {
    return (
      <div>
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return <Navigate to={'/login'}>{children}</Navigate>;
};

export default PrivetRoute;
