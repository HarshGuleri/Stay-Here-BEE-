import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from './NavBar'
import './roomdetails.css'; // Ensure you have the necessary CSS for styling

const RoomDetails = ({ items }) => {
    const { id } = useParams();
    const room = items.find(item => item.id.toString() === id);

    if (!room) {
        return <div>Room not found</div>;
    }

    return (
        <div className="father">
            <NavBar/>
            <div className="containerX">
                <div className="first-cont">
                    <div className="imageCont">
                        <img className="image-in" src={room.image} alt={room.title} />
                    </div>
                    <div className="Discrp">
                        <div className="uppCorn">
                            <h1>{room.title}</h1>
                            <p><b>Price: ₹</b>{room.price}</p>
                            <p><b>Room Type:</b> {room.roomType}</p>
                            <p><b>Size:</b> {room.size}</p>
                            <p><b>Bed:</b> {room.bed}</p>
                            <p><b>Bathroom:</b> {room.bathroom}</p>
                            <p><b>View:</b> {room.view}</p>
                            <p><b>Connectivity:</b> {room.connectivity}</p>
                        </div>
                    </div>
                </div>

                <div className="lowCorn">
                    <div className="additional-details">
                        <h2>More Features :-</h2>
                        <p><b>Entertainment: </b> {room.entertainment}</p>
                        <p><b>Amenities:</b> {room.amenities}</p>
                        <p><b>Services:</b> {room.services}</p>
                    </div>
                    <Link to="/">
                        <button className="back-home">Back to Home</button>
                    </Link>
                </div>

                {/* <button className="book-now-btn">BOOK NOW</button> */}

            </div>
        </div>
    );
};

export default RoomDetails;
