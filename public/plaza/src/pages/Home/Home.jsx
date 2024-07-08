import { useState, useEffect, useContext } from "react";
import { bringLocations } from "../../services/api-calls";
import { myContext } from "../../app/context";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import AdverbCard from "../../common/Ad-card.jsx/AdverbCard";

function Home() {
  const [locations, setLocations] = useState([]);
  const { state, SetAuth } = useContext(myContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (locations.length === 0) {
      const getLocations = async () => {
        bringLocations()

          .then((res) => {
            setLocations(res);
          })
          .catch((error) => console.log(error));
      };
      getLocations();
    }

    console.log(locations);
  }, [locations]);

  useEffect(() => {
    console.log(state)
  }, [state])

  console.log(locations)
  return (

    <div className="home-design">
      {locations.length > 0 ? (
        //I have got the movies
        <div>
          {locations.map((location) => {
            return <div key={location.id}><AdverbCard photo={location.base64_photo}  author={location.author} title={location.title} description={location.short_description} cost={location.cost} likes={location.likes}></AdverbCard></div>;
          })}
        </div>
      ) : (
        <div>LOADING.......</div>
      )}
    </div>
  );
}

export default Home;
