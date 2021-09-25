import "./watch.scss";
import React,{useEffect,useState} from "react";
import Load from '../Loading/Load'
import { useParams } from "react-router";
import axios from "axios";
export default function Watch() {
  const [loading, setLoading] = useState(true)
  const[video,setvideo]=useState()
  const path=useParams()
  const id=path.id
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
    <div className="watch">
      <video
        className="video"
        autoPlay
        progress
        controls
        src={video.video}
      />
    </div>
    }</>
  );
}