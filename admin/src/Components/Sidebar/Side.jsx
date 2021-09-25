import React from 'react'
import dp from '../../images/dp.jpg'
import './side.scss'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../features/user/Auth'
const Side = () => {
    const user=useSelector(state=>state.Auth.user)
    const dispatch=useDispatch()
    return (
        <div className="sidebar">
        <h3 className="logo"><Link className="lik" to='/'>Xrare</Link></h3>
            <ul>
                <li><img src={user.profile||dp} alt="user"></img></li>
                <li><Link className="link" to='/videos'><i className="fas fa-film dm"></i>Videos</Link></li>
                <li><Link className="link" to='/users'><i className="fas fa-users dm"></i>Users</Link></li>
                <li><Link className="link" to='/register'><i className="fas fa-user-plus dm"></i>Add Users</Link></li>
                <li><Link className="link" to='/upload'><i className="far fa-file-video dm"></i>Upload Video</Link></li>
                <li onClick={()=>dispatch(logout())}><i  className="fas fa-sign-out-alt dm"></i>Logout</li>
            </ul>
        </div>
    )
}

export default Side
