import React from 'react'
import './vcard.scss'
import { Link } from 'react-router-dom'
import video from '../../images/feature.jpg'
const Vcard = ({movie}) => {
    return (
        <div className="videoposter">
            <Link to={`/video/${movie._id}`} className="link">
            <img src={movie.img||video} alt={movie.title}></img>
            <div className="playbutn"><i className="fas fa-play"></i></div>
            </Link>
        </div>
    )
}
export default Vcard
