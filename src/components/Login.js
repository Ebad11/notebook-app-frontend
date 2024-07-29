import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
function Login(props) {
    let navigate= useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""});
    async function handleSubmit(e)
    {
        e.preventDefault();
        const response = await fetch("https:notebook-app-backend-ebadshk.vercel.app/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
          });

        const json= await response.json();
        // console.log(json);

        if(json.success)
        {
            props.showAlert("Logged in successfully","success")
            localStorage.setItem('token', json.authToken);
            navigate('/');
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }

    }

    function handleChange(e)
    {
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} onChange={handleChange} className="form-control" id="email"  name="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"  value={credentials.password} onChange={handleChange} className="form-control" name="password" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
