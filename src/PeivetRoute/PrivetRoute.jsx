import { useContext } from "react";
import { authContex } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRoute = ({ children }) => {
  const { user , loader} = useContext(authContex);

  const location = useLocation()

  if(user){
    return children;
  }
  if (loader) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return <Navigate to={'/login'} state={location.pathname}>{children}</Navigate>;
};

export default PrivetRoute;
