import React,{useEffect,useState} from 'react'
import Load from '../Loading/Load'
import { Link } from 'react-router-dom'
import './register.scss'
import axios from 'axios'
import storage from '../../firebase'
import { ref,getDownloadURL,uploadBytesResumable } from "firebase/storage"
const Register = () => {
    const [loading, setLoading] = useState(true)
    const[error,seterror]=useState(false)
    const[sucess,setsucess]=useState(false)
    const[file,setfile]=useState()
    const[username,setusername]=useState('')
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const [prog,setprog]=useState(0)
    const[profile,setimgurl]=useState('')
    const[admin,setadmin]=useState(false)
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
        console.log(downloadURL)
        setimgurl(downloadURL)
        console.log(profile)
      });
    }
  );
          }    }
          const Adduserdetail=async(e)=>{
              e.preventDefault()
            try{
            const newuser =await axios.post('Adminregister',
           {username,email,password,profile,admin})
            setsucess(true)  
          }
          catch(err)
          {
              seterror(true)
          }
        }

    return (
        <>
        {loading ?<Load></Load>:
        <div className="registermain">
            <div>
                <h3 className="logo"><Link className="link" to='/'>xRare</Link></h3>
                <form onSubmit={Adduserdetail}>
                    <input onChange={e=>setusername(e.target.value)} className='inputfeild' type="text" placeholder="Enter user name" required></input>
                    <input onChange={e=>setemail(e.target.value)} className='inputfeild' type="email" placeholder="Enter Email Address" required></input>
                    <input onChange={e=>setpassword(e.target.value)} className='inputfeild' type="password" placeholder="Enter Password" required></input>
                    <input onChange={e=>setfile(e.target.files[0])} className='filefeild' type="file"  required></input>
                    <button className="btnupp" onClick={uploadimage}>upload</button><button className="btnupp">{prog.toFixed(2)}%</button>
                    <span className="isadmin">Admin</span>
                    <input className='chbox' onChange={e=>setadmin(!admin)} type="checkbox"></input>
                   <br/>
                    <button className="regbtn" type="submit">Register</button>
                    <span className="redsn"><Link  to='/login'>Have an Account want to Singin?</Link></span>
                    {sucess&&<p className="sucse">User Registered Successfully</p>}
                    {error&&<p className="fail">User not Registered !</p>}
                </form>
            </div>
        </div>
        }</>
    )
}

export default Register
