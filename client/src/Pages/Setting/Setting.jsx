import React,{useEffect,useState} from 'react'
import dp from '../../images/dp.jpg'
import './setting.scss'
import Load from '../Loading/Load'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../../features/user/Auth'
import storage from '../../firebase'
import { ref,getDownloadURL,uploadBytesResumable } from "firebase/storage"
const Setting = () => {
    const user=useSelector((state)=>state.Auth.user)
    const dispatch=useDispatch()
    const [loading, setLoading] = useState(true)
    const[error,seterror]=useState(false)
    const[sucess,setsucess]=useState(false)
    const[file,setfile]=useState()
    const[username,setusername]=useState(user.username)
    const[email,setemail]=useState(user.email)
    const[password,setpassword]=useState('')
    const [prog,setprog]=useState(0)
    const[profile,setimgurl]=useState(user.profile)
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000)
    }, [])
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
    const updateuserdetail=async()=>{
      try{
      const updateduser =await axios.put('update/'+user._id,
     {username,email,password,profile}, { headers: {
          token:
            "Bearer "+JSON.parse(localStorage.getItem("xrareuser")).accessToken,
        },
      })
      setsucess(true)
      setTimeout(()=>dispatch(logout()),5000)  
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
               <label htmlFor="dpupload"> <img   className="prof" src={user.profile||dp} alt="profile"></img></label><input type="file" name="file" onChange={e=>setfile(e.target.files[0])} id="dpupload" style={{display:"none"}} required></input>
            <button onClick={uploadimage} style={{marginRight:"1rem"}}>Upload</button>
            <button>{prog.toFixed(2)}%</button>
                <input name="username" onChange={e=>setusername(e.target.value)} className='inputfeild' type="text" placeholder="Enter user name" required></input>
                <input name="email" onChange={e=>setemail(e.target.value)} className='inputfeild' type="email" placeholder="Enter Email Address" required></input>
                <input name="password" onChange={e=>setpassword(e.target.value)} className='inputfeild' type="password" placeholder="Enter new Password" required></input>
                <button className="regbtn" type="submit">Update</button>
           {sucess&&<p className="sucse">User Updated Successfully Login Again!</p>}
           {error && <p className="fail">User not Updated !</p>}
            </form>
        </div>
    </div>
        }</>
    )
}

export default Setting
