
import "./Profile.css"; import { useState, useContext, useEffect } from "react"
import { bringUser } from "../../services/api-calls";
import { myContext } from "../../app/context"
import { ValidateUser } from "../../services/api-calls";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import LikeCard from "../../common/LikeCard/LikeCard.jsx";
function Profile() {
    const navigate = useNavigate()

    function seeDetails(locationid) {
        console.log("click");
        if (state.auth.token) {

            ValidateUser(state.auth.token)
                .then(res => {
                    if (res.status == "Success") {
                        SetAuth("locationdetail", locationid)
                        navigate(`/detail`)
                    }
                    else {
                        console.log(res.status);

                    }

                })
                .catch(error => console.log(error))
        } else {
        }
    }

    const { state, SetAuth } = useContext(myContext)
    const [userinfo, setuserinfo] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            let $decoded = jwtDecode(state.auth.token)
            await bringUser($decoded?.firstName)
                .then((res) => {
                    setuserinfo(res);

                })
                .catch((error) => console.log(error));
        };
            getUsers();


    }, [userinfo]);

    return (
        <div className="profile">
            <div className="profile-design">
                Username: {userinfo?.username} <br></br>
                Email: {userinfo?.email} <br></br>

                {userinfo?.liked?.length > 0 ? (

                    <div>

                        {userinfo?.liked.map((location) => {

                            return <div key={location[0]} onClick={() => seeDetails(location[0])}><LikeCard photo={location[2]} author={""} title={location[1]} description={""} cost={""} likes={""}></LikeCard></div>;

                        })}

                    </div>

                ) : (
                    <div>LOADING.......</div>
                )}

            </div>
        </div>
    )
}

export default Profile;