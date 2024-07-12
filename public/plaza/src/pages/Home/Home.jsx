import { useState, useEffect, useContext } from "react";
import { bringLocations } from "../../services/api-calls";
import { ValidateUser } from "../../services/api-calls";
import { myContext } from "../../app/context";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import AdverbCard from "../../common/Ad-card.jsx/AdverbCard";



function Home() {

  function seeDetails(locationid){
    console.log("click");
    if(state.auth.token){
      
      ValidateUser(state.auth.token)
      .then(res => {
        if(res.status == "Success"){
          console.log(res.status);
          SetAuth("locationdetail", locationid)
          navigate(`/detail`)
        }
        else{
          console.log(res.status);
          setDetailError("You need to be logged in to see details")
        }
        
      })
      .catch(error => console.log(error))
    }else{
      setDetailError("You need to be logged in to see details")
    }
  }

  const [DetailError, setDetailError] = useState([]);
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

  }, [locations]);


  return (

    <div className="home-design">
      
      {locations.length > 0 ? (
        
        <div>
          { DetailError }

          {locations.map((location) => {
            
            return <div key={location.id} onClick={() => seeDetails(location.id)}><AdverbCard  photo={location.base64_photo}  author={location.author} title={location.title} description={location.short_description} cost={location.cost} likes={location.likes}></AdverbCard></div>;
          
          })}
          
        </div>
        
      ) : (
        <div>LOADING.......</div>
      )}
    </div>
  );
}

export default Home;
