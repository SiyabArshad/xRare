import Back from '../../Components/Backmenu/Back'
import Load from '../Loading/Load'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import './video.scss'
import { useHistory } from 'react-router'
import axios from 'axios'
import Side from '../../Components/Sidebar/Side'
import feat from '../../images/feature.jpg'
const Video = () => {
    const history=useHistory()
    const [loading, setLoading] = useState(true)
    const[videos,setvideo]=useState([])
    const [title,settitle]=useState()
    const getsearchvideo=async(e)=>{
        e.preventDefault()
        try{
             const searchv=await axios.get(`http://localhost:5000/xrare/searchvideo?title=${title}`,{
                headers: {
                  token:
                    "Bearer " + JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken,
                },
              })
              setvideo(searchv.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const getallvideo=async()=>{
        try{  
            const allvideos=await axios.get('videos',{
              headers: {
                token:
                  "Bearer " + JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken,
              },
            })
            setvideo(allvideos.data)
            }
        catch(err)
        {
          console.log(err)
        }
    }
    useEffect(() => {
        getallvideo()
      setTimeout(() => setLoading(false), 1000)
    }, [])
    const deletevideo=async(id)=>{
        try{
            await axios.delete(`deletevideo/${id}`,{
                headers: {
                  token:
                    "Bearer " + JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken,
                },
              })
              history.push('/videos')
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return (
        <>
        {loading ?<Load></Load>:
        <div className="video">
               <div className='sec1'>
                <Side></Side>
            </div>
            <div className='videos'>
                <h2>Videos</h2>
                <form onSubmit={getsearchvideo} className="searchuser">
               <input onChange={e=>settitle(e.target.value)} type="text"></input>
               <button type="submit">Search</button>
            </form>
                <div className="allvideos">
                   {videos.map((i)=>(
                   <div className="sinvid">
                    <img className="im" src={i.img||feat} alt="video"></img>
                    <span>{i.title}</span>
                    <p>{i.desc.slice(0,100)}</p>
                    <div className="buttons">
                        <button><Link className="link" to={`/videos/${i._id}`}>Update</Link></button>
                        <button onClick={()=>deletevideo(i._id)}>Delete</button>
                    </div>
                    </div>
                    )) }
                </div>
                <Back></Back>
            </div>
        </div>
        }</>
    )
}

export default Video
