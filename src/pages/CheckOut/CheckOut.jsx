import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { authContex } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";

const CheckOut = () => {
  const loaderData = useLoaderData();
  const {user} = useContext(authContex)
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = data =>{
    const datas = {...data, title: loaderData.title};
    fetch('http://localhost:5000/checkOut', {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(datas)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <div>
      <div className="flex flex-col gap-5 items-center justify-center my-5">
        <h2 className="text-3xl font-bold">Check out: {loaderData.title}</h2>
        <img className="w-72" src={loaderData.img} alt="" />
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5">
            <label className="label">
              <span className="label-text">Name:</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="name"
              className="input input-bordered"
              defaultValue={user?.displayName}
            />
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              {...register("date")}
              type="date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="flex gap-5">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="email"
              className="input input-bordered"
              defaultValue={user?.email}
            />
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              {...register("price")}
              type="text"
              className="input input-bordered"
              defaultValue={'$'+ loaderData.price}
            />
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
