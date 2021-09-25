import Load from '../Loading/Load'
import React,{useEffect,useState} from 'react'
import feat from '../../images/feature.jpg'
import Side from '../../Components/Sidebar/Side'
import { useParams } from 'react-router'
import axios from 'axios'
import storage from '../../firebase'
import { ref,getDownloadURL,uploadBytesResumable } from "firebase/storage"
const Updatev = () => {
    const [loading, setLoading] = useState(true)
    const[sucess,setsucess]=useState(false)
    const[error,seterror]=useState(false)
    const path=useParams()
    const[upvideo,setupvideo]=useState()
    const[title,settitle]=useState()
    const[desc,setdesc]=useState()
    const[file1,setfile1]=useState('')
    const[file2,setfile2]=useState('')
    const[img,setimg]=useState()
    const[video,setvideo]=useState()
    const [prog,setprog]=useState(0)    
    const uploadposter=()=>{
        if(!file1)
        {
          seterror(true)
        }
        else{
        const metadata = {
          contentType: 'image/jpeg'
        };
        const storageRef = ref(storage, 'posters/' + file1.name);
        const uploadTask = uploadBytesResumable(storageRef, file1, metadata);
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
        setimg(downloadURL)
      });
    }
    );
          }    }
    
    //upload video
    
    const uploadvideo=()=>{
        if(!file2)
        {
          seterror(true)
        }
        else{
        const metadata = {
          contentType: 'video/mp4'
        };
        const storageRef = ref(storage, 'videos/' + file2.name);
        const uploadTask = uploadBytesResumable(storageRef, file2, metadata);
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
        setvideo(downloadURL)
      });
    }
    );
          }    }    
    const updatevideo=async(e)=>{
        e.preventDefault()
        try{
          if(title||desc||img||video){
        const newupdated=await axios.put(`http://localhost:5000/xrare/updatevideo/${path.id}`,{title,desc,img,video},{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken
            },
        })
        setsucess(true)
      }
      else
      {
        seterror(true)
      }
    }
    catch(err){
        seterror(true)
    }        
    }
    const requiredvideo=async()=>{
    try{
      const requpv= await axios.get(`/video/${path.id}`,{
            headers: {
              token:
                "Bearer " + JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken,
            },
          })
          setupvideo(requpv.data)
    }
    catch(err){
        console.log(err)
    }        
    }
    useEffect(() => {
        requiredvideo()
      setTimeout(() => setLoading(false), 1000)
    }, [])
    return (
        <>
        {loading ?<Load></Load>:
        <div className="upload">
            <div className="sec1">
                <Side></Side>
            </div>
            <div className="sec2">
                <form onSubmit={updatevideo}>
                <img src={img||upvideo.img||feat} alt="poster"></img>
                    <label className="lbl">Title</label>
                    <input   onChange={e=>settitle(e.target.value)} className="inp" type="text"></input>
                    <label className="lbl">Description</label>
                    <textarea  onChange={e=>setdesc(e.target.value)} className="inp"></textarea>
                    <label className="lbl">Poster</label>
                    <input  onChange={e=>setfile1(e.target.files[0])} className="inp" type="file"></input>
                    <button onClick={uploadposter}>upload poster</button>
                    <label className="lbl">Video</label>
                    <input onChange={e=>setfile2(e.target.files[0])} className="inp" type="file"></input>
                    <button onClick={uploadvideo}>upload video</button><br/>
                     <button type="submit">Update</button>
                    <button style={{marginLeft:".2rem"}}>{prog.toFixed(2)}%</button>
                  { sucess&& <p className="sucse">Updated Successfully</p>}
                   { error && <p className="fail">Not Updated!</p>}
                </form>
            </div>
        </div>
        }</>
    )
}

export default Updatev
