import { useContext, useEffect, useState } from "react";
// import { authContex } from "../../AuthProvider/AuthProvider";
// import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Booking = () => {
  const {user} = useAuth()
  // const { user } = useContext(authContex);
  const [booking, setBooking] = useState([]);

  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosSecure.get(`/checkOut?email=${user?.email}`)
    .then(res =>{
      console.log(res.data);
      setBooking(res.data)
    })

    // fetch(`http://localhost:5000/checkOut?email=${user?.email}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setBooking(data);
    //   });
  }, [user, axiosSecure]);

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/checkOut/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          const remaining = booking.filter((data) => data._id !== id);
          setBooking(remaining);
        }
      });
  };

  const handleConfirm = (id) => {
    fetch(`http://localhost:5000/checkOut/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "confirm" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const remaining = booking.filter((data) => data._id !== id);
        const updated = booking.find((data) => data._id === id);
        updated.status = "confirm";
        const newData = [updated, ...remaining];
        setBooking(newData);
      });
  };

  return (
    <div>
      this is booking
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {booking.map((data) => (
                <tr key={data._id}>
                  <th>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn btn-sm btn-circle bg-black text-white font-semibold"
                    >
                      X
                    </button>
                  </th>
                  <td>{data.name}</td>
                  <td>{data.title}</td>
                  <td>{data.price}</td>
                  <td>
                    {data?.status === "confirm" ? (
                      <span className="text-blue-500 font-bold">Confirmed</span>
                    ) : (
                      <button
                        onClick={() => handleConfirm(data._id)}
                        className="btn"
                      >
                        Pleace Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Booking;
