
import React, { useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from './components/NavBar'
import './App.css'
import { BrowserRouter, Route, Switch,useHistory } from 'react-router-dom'
import Home  from './components/screens/Home'
import Profile from './components/screens/Profile'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import { reducer, initialState } from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'

 export const UserContext = createContext()
    
const Routing = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            dispatch({ type: "USER", payload: user })
            history.push('/')
        } else {
            history.push('/signin')
        }
    }, [])
    return (
        <Switch>
            <Route exact path="/"  >
                <Home />
            </Route>
            <Route path="/Signup" components={Signup} >
                <Signup />
            </Route>
            <Route path="/Signin" components={Login}>
                <Login />
            </Route>
            <Route exact path="/Profile" components={Profile} >
                <Profile />
            </Route>
            <Route path="/CreatePost" components={CreatePost} >
                <CreatePost />
            </Route>
            <Route exact path="/Profile/:userid" components={UserProfile} >
                <UserProfile />
            </Route>
        </Switch>
    )
}
    function App() {
        const [state, dispatch] = useReducer(reducer, initialState)
        return (
            <UserContext.Provider value={{ state, dispatch }}>
                <BrowserRouter>
                    <NavBar />
                    <Routing />
                </BrowserRouter>
            </UserContext.Provider >
        )
    }

export default App;
