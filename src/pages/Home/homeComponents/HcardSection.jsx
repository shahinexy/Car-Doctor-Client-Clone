import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HcardSection = () => {
    const [datas, setDatas] = useState([])

    useEffect(()=>{
        fetch('https://car-doctor-server-shahins-projects-02817491.vercel.app/services')
        .then(res => res.json())
        .then(data => setDatas(data))
    },[])
    return (
        <div>
            <div className="text-center my-10 space-y-4">
                <h2 className="text-3xl font-bold">This is a Heading for card secssion</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem distinctio expedita minus aliquam fugiat reprehenderit quibusdam ea autem iste earum in, commodi natus officiis laborum adipisci, et eligendi ab? Sapiente?</p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-5 my-10">
                {
                    datas.map(data => <div key={data._id} className="space-y-3 shadow-md p-3 border border-gray-300">
                        <img src={data.img} alt="" />
                        <h2 className="text-2xl font-bold">{data.title}</h2> 
                        <p>{data.description.slice(0, 170)}...</p>
                        <Link to={`/checkOut/${data._id}`}><button className="btn">Check out</button></Link>
                    </div>)
                }
            </div>
        </div>
    );
};

export default HcardSection;