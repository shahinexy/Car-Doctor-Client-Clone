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
                  <th>1</th>
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
