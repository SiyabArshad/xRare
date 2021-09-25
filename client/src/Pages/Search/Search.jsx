import React,{useEffect,useState} from 'react'
import Load from '../Loading/Load'
import './lat.scss'
import Vcard from '../../Components/Videocard/Vcard'
import Back from '../../Components/Backmenu/Back'
import {useSelector} from 'react-redux'
const Searchvideo = () => {
    const [loading, setLoading] = useState(true)
    const video=useSelector((state)=>state.Video.video)
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000)
    }, [])
    return (
        <>{
            loading?<Load></Load>:
        <div className="latestmain">
            <span>Search Videos</span>
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

export default Searchvideo
