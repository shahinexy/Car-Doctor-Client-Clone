// import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { authContex } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {loginUser} = useAuth()
  // const {loginUser} = useContext(authContex)
  const location = useLocation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) =>{
    console.log(data)
    loginUser(data.email, data.pass)
    .then(res => {
      console.log(res)
      
      const user = {email: data.email}
      axios.post('http://localhost:5000/jwt', user, {withCredentials: true})
      .then(res => {
        console.log(res.data)
        if(res.data.success){
          navigate(location?.state ? location.state : '/')
        }
      })
    })
    .catch(data => console.log(data))
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                {...register("email")}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                {...register("pass")}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <p>Don't have an account? <Link to={'/register'} className="underline font-semibold">Register</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
