import React from "react";
import "./Likebutton.css";
import { Like } from "../../services/api-calls";
import { useNavigate } from "react-router-dom";

function Likebutton({ token, location, service, onClick }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Like(token, location, service);
      onClick(); // Trigger onClick callback passed from parent component
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="like-button" onClick={handleClick}>
      <span>{service}</span>
    </div>
  );
}

export default Likebutton;
