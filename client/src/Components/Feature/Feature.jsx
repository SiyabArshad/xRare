import React,{useState,useEffect} from 'react'
import './feature.scss'
import axios from 'axios'
import feat from '../../images/feature.jpg'
import { Link } from 'react-router-dom'
const Feature = ({fm}) => {    
    return (
        <div className="feature">
            <img src={fm.img||feat} alt="feature"></img>
          <div className="dect">
          <span>{fm.title}</span>
          <p>{fm.desc.slice(0,300)}</p>
          <Link to={`/watch/${fm._id}`} className="link"><button>Play</button></Link>
          </div>
        </div>
    )
}

export default Feature
