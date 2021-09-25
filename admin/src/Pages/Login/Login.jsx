import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Load from '../Loading/Load'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {login} from '../../features/user/Auth'
import './login.scss'
const Login = () => {
    const dispatch=useDispatch()
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
  const [loading, setLoading] = useState(true)
  const[error,seterror]=useState(false)
const[success,setsuccess]=useState(false)
  const loginuser=async(e)=>{
    e.preventDefault()
    try{
        const userdetail=await axios.post('login',{email,password})
        if(userdetail.data.admin)
        {
        dispatch(login(userdetail.data))
        setsuccess(true)
      }
        else
        {
          seterror(true)  
        }
      }
    catch(err){
        console.log(err)
        seterror(true)
      }
}
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])
    return (
        <>
        {loading ?<Load></Load>:
        <div className="loginmain">
            <div>
            <h3 className="logo">xRare</h3>
                <form onSubmit={loginuser}>
                    <input onChange={e=>setemail(e.target.value)} className='inputfeild' type="email" placeholder="Enter Email Address" required></input>
                    <input  onChange={e=>setpassword(e.target.value)} className='inputfeild' type="password" placeholder="Enter Password" required></input>
                    <button className="regbtn" type="submit">Singin</button>
                    <Link className="link" to='/reset'>  <span className="redsn">Forgot Password?</span></Link>
                  {success&&(<h3 className="suc">Login Success!</h3>)}
                    {error&&(<h3 className="err">Login Failed!</h3>)}
                </form>
            </div>
        </div>
        }</>
    )
}

export default Login
