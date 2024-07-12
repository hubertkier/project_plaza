import React from "react";
import "./LikeCard.css";

function LikeCard({ photo, title }) {
  return (
    <div className="card-design">
      <img className="card-image" src={photo} alt={title} />
      <div className="card-details">
        <div className="card-title">{title}</div>
      </div>
    </div>
  );
}

export default LikeCard;
