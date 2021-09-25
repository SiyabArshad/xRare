import React,{useEffect,useState} from 'react'
import Load from '../Loading/Load'
import './lat.scss'
import Vcard from '../../Components/Videocard/Vcard'
import Back from '../../Components/Backmenu/Back'
import axios from 'axios'
const Latest = () => {
    const [loading, setLoading] = useState(true)
    const [video,setvideo]=useState([])
    const fetchvideos=async()=>{
      try{  
      const videos=await axios.get('latestvideos',{
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
        fetchvideos()
      setTimeout(() => setLoading(false), 1000)
    }, [])
    return (
        <>{
            loading?<Load></Load>:
        <div className="latestmain">
            <span>Latest Uploads</span>
            <div className="latest">
            {
               video.map((v)=>(
                 <Vcard movie={v} key={v._id}></Vcard>
               ))
             }
       
            </div>
            <Back></Back>
        </div>}</>
    )
}

export default Latest
