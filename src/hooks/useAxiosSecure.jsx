import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://car-doctor-server-shahins-projects-02817491.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("error tracked in the interceptors", error.response);
        if(error.response.status === 401 || error.response.status === 403){
            console.log('logout user');
        }
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
