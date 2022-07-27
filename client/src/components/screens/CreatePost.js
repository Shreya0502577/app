// JavaScript source code
import React, { useState } from 'react'
import {useHistory } from 'react-router-dom'
import M from 'materialize-css'

 const CreatePost = () => {
    const history = useHistory()
    const [title, settitle] = useState("")
    const [body, setbody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    /*useEffect(() => {
        if (url) {
            
    },[url])*/
    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "shreyahc")
        fetch("https://api.cloudinary.com/v1_1/shreyahc/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
               // console.log(data)
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }
    fetch('/createpost', {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            title,
            body,
            photo: url
        })
    }).then(res => res.json())
    // console.log('TypeError: failed to fetch')
        .then(data => {
            if (data.error) {
                M.toast({ html: data.error, classes: "#9c27b0 purple" })
            }
            else {
                M.toast({ html: 'created post Successfully', classes: "#9c27b0 purple" })
                history.push('/')
            }
        })
    //}

    return (
      
            <div className="mycard" >
                <div className="card auth-card input-field"
                    style={{
                        margin: "30px auto",
                        maxwidth: "500px",
                        padding: " 100 px",
                        textAlign: "center"

                    }}
                >
                    <input type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                    />
                    <input type="text"
                        placeholder="body"
                        value={body}
                        onChange={(e) => setbody(e.target.value)}
                    />
                    <div className="file-field input-field">
                        <div className="btn  #9c27b0 purple">
                            <span>Upload Image </span>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light #9c27b0 purple"
                        onClick={() => postDetails()}>
                        Submit Post
                    </button>

                </div>
            </div>

        )

}
export default CreatePost