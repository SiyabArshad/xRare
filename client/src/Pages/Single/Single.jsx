import React,{useEffect,useState} from 'react'
import './single.scss'
import Load from '../Loading/Load'
import dp from '../../images/feature.jpg'
import axios from 'axios'
import { Link,useParams } from 'react-router-dom'
const Single = () => {
  const [loading, setLoading] = useState(true)
  const path=useParams()
  const id=path.id
  const[video,setvideo]=useState()
  const fetchselecte=async()=>{
    try{
      const videos=await axios.get(`/video/${id}`,{
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("xrareuser")).accessToken,
        },
      })
    setvideo(videos.data)
  }
  catch(err)
  {
    console.log(err)
  }
  }
useEffect(() => {
 fetchselecte()
  setTimeout(() => setLoading(false), 1000)
}, [])

    return (
        <>
        {loading?<Load></Load>:
        <div className="singlevideo">
            <div className="media">
                <img src={video.img||dp} alt="video"></img>
            </div>
            <span>{video.title}</span>
            <p>{video.desc}</p>
            <Link to={`/watch/${video._id}`} className="link">  <button>Play</button></Link>
        </div>
        }</>
    )
}

export default Single
