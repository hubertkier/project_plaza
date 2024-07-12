import { useState, useContext, useEffect } from "react";
import { bringLocation, Liked } from "../../services/api-calls";
import "./LocationDetail.css";
import Likebutton from "../../common/Likebutton/Likebutton";

import { myContext } from "../../app/context";
import DetailCard from "../../common/DetailCard/DetailCard";

function LocationDetail() {
  const { state, SetAuth } = useContext(myContext);
  const [location, setLocation] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const locationRes = await bringLocation(state.auth.locationdetail);
        setLocation(locationRes);

        const likedRes = await Liked(state.auth.token, state.auth.locationdetail);
        setIsLiked(likedRes);
      } catch (error) {
        console.log(error);
      }
    };

    getLocations();
  }, [state.auth.locationdetail, state.auth.token]);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        setIsLiked(false);
        setLocation((prevLocation) => ({
          ...prevLocation,
          likes: prevLocation.likes - 1,
        }));
      } else {
        setIsLiked(true);
        setLocation((prevLocation) => ({
          ...prevLocation,
          likes: prevLocation.likes + 1,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-design">
      <div>
        <Likebutton
          token={state.auth.token}
          location={state.auth.locationdetail}
          service={isLiked ? "Unlike" : "Like"}
          onClick={handleLikeToggle}
        />
        <DetailCard
          photo={location.base64_photo}
          author={location.author}
          title={location.title}
          description={location.full_description}
          price={location.price}
          saves={location.saves}
          lon={location.lon}
          lat={location.lat}
          likes={location.likes}
        />
      </div>

    </div>
  );
}

export default LocationDetail;
