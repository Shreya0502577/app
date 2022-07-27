// JavaScript source code
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'

const NavBar = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if (state) {
            return [
            <li><Link to="/Profile">Profile</Link></li>,
                <li><Link to="/CreatePost">Create Post</Link></li>,
                <li >
                    <button className="btn waves-effect waves-light #9c27b0 purple"
            onClick={()=>{
              localStorage.clear()
                dispatch({ type: "CLEAR" })
                history.push('/signin')
            }}
             >Logout
                    </button></li>


           ]
        } else {
            return [
                <li><Link to="/Signin">Signin</Link></li>,
                <li><Link to="/Signup">Signup</Link></li>
            ]
        }
    }
        return (
            <nav>
                <div className="nav-wrapper purple " style={{ color: "black" }}>
                    < Link to={state ? "/" : "/signin"} className="brand-logo">Social</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {renderList()}
                    </ul>
                </div>
            </nav>
        )
    }
//}

export default NavBar
