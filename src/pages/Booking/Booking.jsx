import { useContext, useEffect, useState } from "react";
import { authContex } from "../../AuthProvider/AuthProvider";

const Booking = () => {
  const { user } = useContext(authContex);
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/checkOut?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBooking(data);
      });
  }, [user]);

  const handleDelete = id =>{
    console.log(id);
    fetch(`http://localhost:5000/checkOut/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.deletedCount >0){
        const remaining = booking.filter(data => data._id !== id);
        setBooking(remaining)
      }
    })
  }

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
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {booking.map((data) => (
                <tr key={data._id}>
                  <th><button onClick={() => handleDelete(data._id)} className="btn btn-sm btn-circle bg-black text-white font-semibold">X</button></th>
                  <td>{data.name}</td>
                  <td>{data.title}</td>
                  <td>{data.price}</td>
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
