import React, { useState, useContext, useEffect } from "react";
import { bringUser, ValidateUser } from "../../services/api-calls";
import { myContext } from "../../app/context";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LikeCard from "../../common/LikeCard/LikeCard.jsx";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { state, SetAuth } = useContext(myContext);
  const [userinfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        let decoded = jwtDecode(state.auth.token);
        const res = await bringUser(decoded?.firstName);
        setUserInfo(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (state.auth.token) {
      getUsers();
    }
  }, [state]);

  function seeDetails(locationid) {
    if (state.auth.token) {
      ValidateUser(state.auth.token)
        .then((res) => {
          if (res.status === "Success") {
            SetAuth("locationdetail", locationid);
            navigate(`/detail`);
          } else {
            console.log(res.status);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        {userinfo ? (
          <>
            <div className="profile-info">
              <div className="profile-item">
                <span className="profile-label">Username:</span>{" "}
                {userinfo?.username}
              </div>
              <div className="profile-item">
                <span className="profile-label">Email:</span>{" "}
                {userinfo?.email}
              </div>
            </div>

            {userinfo?.liked?.length > 0 ? (
              <div className="liked-locations">
                {userinfo.liked.map((location) => (
                  <div
                    key={location[0]}
                    className="liked-location"
                    onClick={() => seeDetails(location[0])}
                  >
                    <LikeCard
                      photo={location[2]}
                      author={""}
                      title={location[1]}
                      description={""}
                      cost={""}
                      likes={""}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="loading-message">LOADING.......</div>
            )}
          </>
        ) : (
          <div className="loading-message">LOADING.......</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
