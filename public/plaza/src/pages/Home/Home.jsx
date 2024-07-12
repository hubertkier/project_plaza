import { useState, useEffect, useContext } from "react";
import { bringLocations, ValidateUser } from "../../services/api-calls";
import { myContext } from "../../app/context";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import AdverbCard from "../../common/Ad-card.jsx/AdverbCard";

function Home() {
  const [detailError, setDetailError] = useState("");
  const [locations, setLocations] = useState([]);
  const { state, SetAuth } = useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (locations.length === 0) {
      const getLocations = async () => {
        try {
          const res = await bringLocations();
          setLocations(res);
        } catch (error) {
          console.log(error);
        }
      };
      getLocations();
    }
  }, [locations]);

  function seeDetails(locationid) {
    if (state.auth.token) {
      ValidateUser(state.auth.token)
        .then((res) => {
          if (res.status === "Success") {
            SetAuth("locationdetail", locationid);
            navigate(`/detail`);
          } else {
            setDetailError("You need to be logged in to see details");
          }
        })
        .catch((error) => console.log(error));
    } else {
      setDetailError("You need to be logged in to see details");
    }
  }

  return (
    <div className="home-design">
      {locations.length > 0 ? (
        <div className="locations-container">
          {detailError && <div className="error-message">{detailError}</div>}
          {locations.map((location) => (
            <div key={location.id} className="location-card" onClick={() => seeDetails(location.id)}>
              <AdverbCard
                photo={location.base64_photo}
                author={location.author}
                title={location.title}
                description={location.short_description}
                price={location.price}
                likes={location.likes}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="loading-message">LOADING.......</div>
      )}
    </div>
  );
}

export default Home;
