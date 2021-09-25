import React,{useEffect,useState} from 'react'
import Load from '../Loading/Load'
import './home.scss'
import Side from '../../Components/Sidebar/Side'
import axios from 'axios'
const Home = () => {
    const [loading, setLoading] = useState(true)
    const [totaluser,settotaluser]=useState(0)
    const [totalvideos,settotalvideos]=useState(0)
    const getalluser=async()=>{
        try{
            const tu=await axios.get('allusers', { headers: {
                token:
                  "Bearer "+JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken,
              },
            })
            settotaluser(tu.data)

        }
        catch(err){console.log(err)}
    }
    const getallvideos=async()=>{
        try{
            const tu=await axios.get('totalvideos', { headers: {
                token:
                  "Bearer "+JSON.parse(localStorage.getItem("xrareAdminuser")).accessToken,
              },
            })
          settotalvideos(tu.data)
        }
        catch(err){console.log(err)}
    }
    useEffect(() => {
        getalluser()
        getallvideos()
        setTimeout(() => setLoading(false), 1000)
  }, [])
    return (
        <>
        {loading ?<Load></Load>:
        <div className="adminhome">
            <div className="sect1">
                <Side></Side>
            </div>
            <div className="sect2">
                <div className="usvd">
                    <div className="us">
                        <h4>Total users on Xrare</h4>
                        <span>{totaluser}</span>
                        <div>date:{new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()}</div>
                    </div>
                    <div className="vd">
                    <h4>Total Videos on Xrare</h4>
                        <span>{totalvideos}</span>
                    <div>date:{new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()}</div>
                    </div>
                </div>
            </div>
        </div>
    }</>
    )
}
export default Home