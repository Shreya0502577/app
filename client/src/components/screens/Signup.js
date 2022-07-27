// JavaScript source code
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'


const Signup = () => {
    const history = useHistory()
   const [name, setName] = useState(" ")
    const [password, setpassword] = useState(" ")
    const [email, setemail] = useState(" ")
    const PostData = () => {
        fetch("/signup", {
            method:"POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html:data.error, classes: "#9c27b0 purple" })
                }
                else {
                    M.toast({ html: data.message, classes: "#9c27b0 purple" })
                    history.push('/Signin')
                }
            })/*.catch(err => {
                console.log(err)
                        })*/
            }
         
       
       
        return (
            <div className="mycard" >
                <div className="card auth-card input-field">
                    <h2>Social</h2>
                    <input type="text"
                     placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <input type="text"
                     placeholder="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <input type="password"
                      placeholder="password"
                       value={password}
                        onChange={(e) => setpassword(e.target.value)} />
                    <button className="btn waves-effect waves-light #9c27b0 purple"
                        onClick={() => PostData()}
                    > Signup
                    </button>
                    <h5>
                        <Link to="/signin">Already have an account?</Link></h5>

                </div>
            </div>
        )
    }
export default Signup