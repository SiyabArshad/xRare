import React,{useEffect,useState} from 'react'
import './home.scss'
import axios from 'axios'
import Feature from '../../Components/Feature/Feature'
import Load from '../Loading/Load'
import Vcard from '../../Components/Videocard/Vcard'
import Back from '../../Components/Backmenu/Back'
const Home = () => {
    const [video,setvideo]=useState([])
    const[last,setlast]=useState()
    const fetchvideos=async()=>{
      try{  
          const videos=await axios.get('videos',{
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

    const featvideo=async()=>{
      try{
          const videos=await axios.get("/lastvideo",{
            headers: {
              token:
                "Bearer " + JSON.parse(localStorage.getItem("xrareuser")).accessToken,
            },
          })
        setlast(videos.data)
      }
      catch(err)
      {
        console.log(err)
      }  
  }
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000)
      fetchvideos();
      featvideo();
    }, [])
    return (
        <>
        {loading?<Load></Load>:
        <div className="home">
            <Feature fm={last}></Feature>
        <div className="combvideos">
             {
               video.map((v)=>(
                 <Vcard movie={v} key={v._id}></Vcard>
               ))
             }
                              </div>
                <Back></Back>
        </div>
        }</>
    )
}
export default Home