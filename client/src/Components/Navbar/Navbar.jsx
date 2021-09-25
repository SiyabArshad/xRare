import React,{useState} from 'react'
import './nav.scss'
import axios from 'axios'
import dp from "../../images/dp.jpg"
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {logout} from '../../features/user/Auth'
import {search} from '../../features/movie/movie'
const Navbar = () => {
    const user=useSelector((state)=>state.Auth.user)
    const dispatch=useDispatch()
    const[clicked,setclicked]=useState(false)
    const [title,setsearchvideo]=useState('')
      const searchvideos=async(e)=>{
       // e.preventDefault()
        try{  
            const videos=await axios.get(`searchvideo?title=${title}`,{
                  headers: {
                    token:
                      "Bearer " + JSON.parse(localStorage.getItem("xrareuser")).accessToken,
                  },
                })
              dispatch(search(videos.data))
            }
            catch(err)
            {
              console.log(err)
            }
          }

        return (
        <div>
        <div className="nbc">
        <div className="fst">
        <i className="fas fa-bars" onClick={()=>setclicked(!clicked)}></i>
        <Link to='/' className="link ln">xRare</Link>
        </div>
        <div className="scnd">
        <form className="fmsearch">
        <input onChange={e=>setsearchvideo(e.target.value)} placeholder="xRare.io" type="text"></input>
        <Link to='/search' className="link"><button onClick={searchvideos}>Search</button></Link>
        </form></div>
        <div className="thrd"><Link to='/setting'> <img src={user.profile||dp} alt="profile"></img></Link></div>
        </div>
        <div className={!clicked? "smmn":"smmn1"}>
        <div className="secondmenu">
        <ul>
      <Link to="/" className="link"><li>Home</li></Link>
      <Link to="/latest" className="link"><li>Latest</li></Link>
        </ul>
        <i onClick={() => dispatch(logout())} className="fa fa-sign-out" aria-hidden="true"></i>
        </div>
        </div>
        </div>
    )
}

export default Navbar
