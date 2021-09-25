import Page404 from './Pages/Notfound/Page404.jsx';
import Home from './Pages/Home/Home.jsx'
import Users from './Pages/Users/Users.jsx';
import Updatev from './Pages/UpdateVideo/Updatev'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Setting from './Pages/Setting/Setting'
import Upload from './Pages/Upload/Upload.jsx';
import Video from './Pages/Videos/Video.jsx';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import Reset from './Pages/Reset/Reset'
import {useSelector} from 'react-redux'
function App() {
  const user=useSelector((state)=>state.Auth.user)
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">{user?<Home></Home>:<Redirect to='/login'></Redirect>}</Route>
        <Route exact path="/users">{user?<Users></Users>:<Redirect to='/login'></Redirect>}</Route>
        <Route exact path="/register">{user?<Register></Register>:<Redirect to='/login'></Redirect>}</Route>
        <Route exact path="/login">{!user?<Login></Login>:<Redirect to="/"></Redirect>}</Route>
        <Route exact path="/videos">{user?<Video></Video>:<Redirect to='/login'></Redirect>}</Route>
        <Route exact path="/upload">{user?<Upload></Upload>:<Redirect to='/login'></Redirect>}</Route>
        <Route exact path="/users/:id">{user?<Setting></Setting>:<Redirect to='/login'></Redirect>}</Route>
        <Route exact path="/videos/:id">{user?<Updatev></Updatev>:<Redirect to='/login'></Redirect>}</Route>
        <Route exact path='/reset'>{!user?<Reset></Reset>:<Redirect to='/'></Redirect>}</Route>
        <Route>
        <Page404></Page404>    
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
