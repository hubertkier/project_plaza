import React from "react";
import "./AdverbCard.css";

function AdverbCard({ photo, title, author, description, price, likes }) {
  return (
    <div className="card-design">
      <img src={photo} alt="Location" className="card-image" />
      <div className="card-info">
        <div className="card-title">{title}</div>
        <div className="card-author">By {author}</div>
        <div className="card-description">{description}</div>
        <div className="card-details">
          <div className="card-cost">Cost per person: {price}</div>
          <div className="card-likes">
            <span role="img" aria-label="Heart">❤️</span> {likes}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdverbCard;
