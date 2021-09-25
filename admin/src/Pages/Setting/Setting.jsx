import React,{useEffect,useState} from 'react'
import dp from '../../images/dp.jpg'
import { Link } from 'react-router-dom'
import './setting.scss'
import Load from '../Loading/Load'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../../features/user/Auth'
import storage from '../../firebase'
import { ref,getDownloadURL,uploadBytesResumable } from "firebase/storage"
import { useParams } from 'react-router'
const Setting = () => {
    const user=useSelector((state)=>state.Auth.user)
    const[ubyid,setubyid]=useState({})
    const dispatch=useDispatch()
    const path=useParams()
    const [loading, setLoading] = useState(true)
    const[error,seterror]=useState(false)
    const getspecificuser=async()=>{
        try{
            const getuser=await axios.get(`http://localhost:5000/xrare/user/${path.id}`,{ headers: {
              token:
                "Bearer "+JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken,
            },
          })
            setubyid(getuser.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const[sucess,setsucess]=useState(false)
    const[file,setfile]=useState()
    const[username,setusername]=useState(ubyid.username)
    const[email,setemail]=useState(ubyid.email)
    const[password,setpassword]=useState('')
    const [prog,setprog]=useState(0)
    const[profile,setimgurl]=useState(ubyid.profile) 
    useEffect(() => {
        getspecificuser()
      setTimeout(() => setLoading(false), 1000)
    }, [path.id])
    const uploadimage=(e)=>{
      e.preventDefault()
      if(!file)
      {
        seterror(true)
      }
      else{
      const metadata = {
        contentType: 'image/jpeg'
      };
      const storageRef = ref(storage, 'users/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setprog(progress)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setimgurl(downloadURL)
    });
  }
);
        }    }
    const updateuserdetail=async(e)=>{
      e.preventDefault()
      try{
      const updateduser =await axios.put(`http://localhost:5000/xrare/update/${path.id}`,
     {username,email,password,profile}, { headers: {
          token:
            "Bearer "+JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken,
        },
      })
      setsucess(true)
      if(user._id===updateduser._id)
      {
      setTimeout(()=>dispatch(logout()),5000)  
      }
    }
    catch(err)
    {
        seterror(true)
    }
  }
    return (
        <>
        {loading?<Load></Load>:
        <div className="settingmain">
        <div>
            <form onSubmit={updateuserdetail}>
            <h3 className="logo"><Link className="link" to='/'>xRare</Link></h3>
               <label htmlFor="dpupload"> <img   className="prof" src={profile||ubyid.profile||dp} alt="profile"></img></label><input type="file" onChange={e=>setfile(e.target.files[0])} id="dpupload" style={{display:"none"}}></input>
            <button onClick={uploadimage} style={{marginRight:"1rem"}}>Upload</button>
            <button>{prog.toFixed(2)}%</button>
                <input placeholder={ubyid.username}   onChange={e=>setusername(e.target.value)} className='inputfeild' type="text" ></input>
                <input placeholder={ubyid.email}  onChange={e=>setemail(e.target.value)} className='inputfeild' type="email" ></input>
                <input placeholder='password'  onChange={e=>setpassword(e.target.value)} className='inputfeild' type="password" ></input>
                <button className="regbtn" type="submit">Update</button>
           {sucess&&<p className="sucse">User Updated Successfully!</p>}
           {error && <p className="fail">User not Updated !</p>}
            </form>
        </div>
    </div>
        }</>
    )
}

export default Setting
