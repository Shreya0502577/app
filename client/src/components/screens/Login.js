// JavaScript source code
import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'


const Login = () => {
   const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [password, setpassword] = useState(" ")
    const [email, setemail] = useState(" ")
    const PostData = () => {
        fetch("/signin", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
               
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#9c27b0 purple" })
                }
                else {
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload:data.user })
                    M.toast({html: 'signedin success', classes: "#9c27b0 purple" })
                    history.push('/')
                }
            }).catch(err => {
                console.log(err)
                        })
    
    }
    return (
        <div className="mycard" >
            <div className="card auth-card input-field">
                <h2>Social</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
                <button class="btn waves-effect waves-light #9c27b0 purple"
                    onClick={() => PostData()}>Login
                </button>
                <h5>
                    <Link to="/Signup">Dont have an account? </Link></h5>
            </div>
        </div>
    )

}
export default Login