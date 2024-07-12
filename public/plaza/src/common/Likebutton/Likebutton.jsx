
import "./Likebutton.css"
import { Like } from "../../services/api-calls";
import { useNavigate } from "react-router-dom";

function Likebutton ({token, location, service}) {

    const navigate = useNavigate()
    function use(token, location){
        Like(token, location)
    }
    return (
        <div className="Likebutton-design" onClick={() => use(token, location)}>
            {service}
        </div>
    )
}

export default Likebutton;