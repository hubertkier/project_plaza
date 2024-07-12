import "./LikeCard.css"

function LikeCard ({photo, title}) {

    return (
        <div className="carddesign">
            <img width="150vw" height="90vh" src={photo}></img>
            <div>Place: {title}</div><br></br>
        </div>
    )
}

export default LikeCard;