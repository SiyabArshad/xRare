import React,{useState,useEffect} from 'react'
import Load from '../Loading/Load'
import { Link } from 'react-router-dom'
import './register.scss'
import axios from 'axios'
const Register = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000)
    }, [])
const[username,setusername]=useState("")
const[password,setpass]=useState("")
const[email,setemail]=useState("")
const[error,seterror]=useState(false)
const[success,setsuccess]=useState(false)
const register=async(e)=>{
    e.preventDefault()
    try{
        const newuser=await axios.post('register',{username,email,password})
        setLoading(true)
        setTimeout(() => setLoading(false), 500)
        setsuccess(true)
    }
    catch(err)
    {
        seterror(true)
    }
}
    return (
        <>
        {loading?<Load></Load>:
        <div className="registermain">
            <div>
            <h3 className="logo">xRare</h3>
                <form onSubmit={register}>
                    <input name="username" onChange={(e)=>setusername(e.target.value)} className='inputfeild' type="text" placeholder="Enter user name" required></input>
                    <input name="email" onChange={(e)=>setemail(e.target.value)} className='inputfeild' type="email" placeholder="Enter Email Address" required></input>
                    <input name="password" onChange={(e)=>setpass(e.target.value)} className='inputfeild' type="password" placeholder="Enter Password" required></input>
                    <button className="regbtn" type="submit">Register</button>
                    <Link to="/login" className="link"> <span className="redsn">Have an Account want to Singin?</span></Link>
                    {success&&(<h3 className="suc">Registration Completed!</h3>)}
                    {error&&(<h3 className="err">Registration Failed!</h3>)}
                </form>
            </div>
        </div>
        }</>
    )
}

export default Register
