import Load from '../Loading/Load'
import React,{useEffect,useState} from 'react'
const Page404 = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000)
    }, [])
    return (
<>
        {loading ?<Load></Load>:
        <div style={{display:"flex",
        height:"100vh",
        justifyContent:"center",
        alignItems:"center"
        }}>
            <div>
                <h1>Page404 Not found</h1>
            </div>
        </div>
        }</>
    )
}

export default Page404
