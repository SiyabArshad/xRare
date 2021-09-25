import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Load from '../Loading/Load'
import './reset.scss'
import axios from 'axios'
const Reset = () => {
    const[email,setemail]=useState("")
    const [loading, setLoading] = useState(true)
    const[success,setsuccess]=useState(false)
    const[error,seterror]=useState(false)
    const resetsystem=async (e)=>{
          e.preventDefault()
    try{
          await axios.post('reset',{email})
      setsuccess(true)
        } 
      catch(err)
   {
    seterror(true)
   } 
    }
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000)
    }, [])
    return (
    <>
    {loading?<Load></Load>:
    <div className="rloginmain">
            <div>
            <h3 className="rlogo"><Link className="link" to='/'>xRare</Link></h3>
                <form onSubmit={resetsystem}>
                    <input onChange={e=>setemail(e.target.value)} className='inputfeild' type="email" placeholder="Enter Email Address" required></input>
                    <button className="rregbtn" type="submit">Sent Email</button>
                    {success&&(<h3 className="suc">An Email has been Sent to your email Address!</h3>)}
                    {error&&(<h3 className="err">Email not sent!</h3>)}
                </form>
            </div>
        </div>
    }</>
    )
}

export default Reset
