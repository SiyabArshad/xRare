import Load from '../Loading/Load'
import React,{useEffect,useState} from 'react'
import './user.scss'
import { Link,useHistory } from 'react-router-dom'
import Back from '../../Components/Backmenu/Back'
import Side from '../../Components/Sidebar/Side'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../../features/user/Auth'
const Users = () => {
    const history=useHistory()
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.Auth.user)
    const [loading, setLoading] = useState(true)
    const [users,setusers]=useState([])
    const[name,setname]=useState('')
    const getallusers=async()=>{
        try{
            const allusers=await axios.get('users',{
                headers:{
                    token:"Bearer "+ JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken
                },
            })
            setusers(allusers.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const deleteuser=async(id)=>{
        try{
            const deleteuser = await axios.delete(`http://localhost:5000/xrare/delete/${id}`,
            { headers: {
                token:
                  "Bearer "+JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken,
              },
            })
            console.log(deleteuser)
            if(deleteuser.data._id===user._id)
            {
                alert("you delete yourself loging out")
                dispatch(logout())  
            }
            else
            {
                alert("deleting user")
                history.push('/users')
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const getsearchuser=async(e)=>{
        e.preventDefault()
        try{
             const searchv=await axios.get(`http://localhost:5000/xrare/searchuser?name=${name}`,{
                headers: {
                  token:
                    "Bearer " + JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken,
                },
              })
              setusers(searchv.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    useEffect(() => {
    getallusers()
    setTimeout(() => setLoading(false), 1000)
  }, [])
    return (
        <>
        {loading ?<Load></Load>:
        <div className="users">
            <div className='se1'>
                <Side></Side>
            </div>
            <div className='se2'>
            <h2>Users</h2>
            <form onSubmit={getsearchuser} className="searchuser">
               <input type="text" onChange={e=>setname(e.target.value)} placeholder='Enter name'></input>
               <button>Search</button>
           </form>
                <div className="tbl">
                <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
             
    { users.map((i)=>{
        return(
            <>
            <tr>
            <td>{i.username}</td>
    <td>{i.email}</td>
    <td><Link className="link" to={`/users/${i._id}`}><i className="fas fa-edit up"></i></Link></td>
    <td><i className="fas fa-trash de" onClick={()=>deleteuser(i._id)}></i></td>
    </tr>  
</>
        )
    }
        
)}
  </tbody>
                </table>
                <Back></Back>
                </div>
            </div>
       
        </div>
            } </>   )
}

export default Users
