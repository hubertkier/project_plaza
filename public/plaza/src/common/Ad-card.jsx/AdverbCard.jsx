import "./AdverbCard.css"

function AdverbCard ({photo, title, author, description, cost, likes}) {

    return (
        <div className="carddesign">
            <img width="150vw" height="90vh" src={photo}></img>
            <div>Place: {title}</div><br></br>
            <div>Author: {author}</div><br></br>
            <div>Description: {description}</div><br></br>
            <div>Cost per person: {cost}</div><br></br>
            <div>Likes: {likes}</div><br></br>
        </div>
    )
}

export default AdverbCard;