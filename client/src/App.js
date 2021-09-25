import Reset from './Pages/Reset/Reset'
import Page404 from './Pages/Notfound/Page404'
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home'
import Single from './Pages/Single/Single';
import Watch from './Pages/Watch/Watch';
import Latest from './Pages/Latest/Latest';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Setting from './Pages/Setting/Setting';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Searchvideo from './Pages/Search/Search';
function App() {
  const user=useSelector((state)=>state.Auth.user)
  return (
    <>
    <Router>
    {user&&<Navbar></Navbar>}
    <Switch>
    <Route exact path='/'>{user?<Home></Home>:<Redirect to='/login'></Redirect>}</Route>
    <Route exact path='/login'>{!user?<Login></Login>:<Redirect exact to='/'></Redirect>}</Route>
    <Route exact path='/register'>{!user?<Register></Register>:<Redirect exact to='/'></Redirect>}</Route>
    <Route exact path='/latest'>{user?<Latest></Latest>:<Redirect exact to='/login'></Redirect>}</Route>
    <Route exact path='/video/:id'>{user?<Single></Single>:<Redirect exact to='/login'></Redirect>}</Route>
    <Route exact path='/setting'>{user?<Setting></Setting>:<Redirect exact to='/login'></Redirect>}</Route>
    <Route exact path='/watch/:id'>{user?<Watch></Watch>:<Redirect exact to='/login'></Redirect>}</Route>
    <Route exact path='/search'>{user?<Searchvideo></Searchvideo>:<Redirect exact to='/login'></Redirect>}</Route>
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
