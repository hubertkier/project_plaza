
import { useState, useContext, useEffect } from "react"
import { bringLocation, Liked, Like } from "../../services/api-calls";
import "./LocationDetail.css"
import Likebutton from "../../common/Likebutton/Likebutton";

import { myContext } from "../../app/context"
import AdverbCard from "../../common/Ad-card.jsx/AdverbCard";

function LocationDetail () {

    
    const { state, SetAuth } = useContext(myContext)
    const [location, setLocation] = useState([]);

    useEffect(() => {
        if (location.length === 0) {
        const getLocations = async () => {
            bringLocation(state.auth.locationdetail)

            .then((res) => {

                setLocation(res);

                Liked(state.auth.token, state.auth.locationdetail)
                .then((res) => {
                    if(res == true){
                        location.is_liked = true;
                    }
                })
                .catch((error) => console.log(error));


            })
            .catch((error) => console.log(error));
        };
        getLocations();
    }
    });

    return (

        <div className="home-design">
          
            
            <div>


                <AdverbCard  photo={location.base64_photo}  author={location.author} title={location.title} description={location.short_description} cost={location.cost} likes={location.likes}></AdverbCard>
              
            </div>
            
            {location == true ? (
                <div>
                <Likebutton token={state.auth.token} service={"Unlike"} location={state.auth.locationdetail} />
                </div>
            ) : (
                <div>
                <Likebutton token={state.auth.token} service={"Like"} location={state.auth.locationdetail} />
                </div>
            )}
            
          
          
        </div>
      );
}

export default LocationDetail