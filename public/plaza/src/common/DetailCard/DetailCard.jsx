import React from "react";
import "./DetailCard.css";

function DetailCard({ photo, title, author, description, price, likes, saves, lon, lat }) {


  return (
    <div className="card-design">
      <div className="card-content">
        <div className="card-left">
          <div className="card-image-container">
            <img src={photo} alt="Location" className="card-image" />
          </div>
        </div>
        <div className="card-right">
          <div className="card-info">
            <div className="card-title">{title}</div>
            <div className="card-author">By {author}</div>
            <div className="card-description">{description}</div>
            <div className="card-details">
              <div className="card-cost">Cost per person: {price}</div>
              <div className="card-interactions">
            <span role="img" aria-label="Heart">❤️</span> {likes}

                </div>
              </div>
            
          </div>
          <div className="map-container">
            {/* Replace with your map implementation using OpenSSL */}
            <iframe
              title="Location Map"
              width="100%"
              height="200"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={`https://maps.google.com/maps?q=${lat},${lon}&hl=en&z=14&output=embed`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
