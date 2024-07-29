import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Signup(props) {

    let navigate= useNavigate();
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});
    const {name,email,password}= credentials;

    useEffect(() => {
        if(localStorage.getItem("token"))
        {
            navigate("/");
       
        // eslint-disable-next-line
    }}, [])

    async function handleSubmit(e)
    {
        e.preventDefault();
        const response = await fetch("https://notebook-app-backend-ebadshk.vercel.app/api/auth/createuser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password})
          });

        const json= await response.json();
        // console.log(json);

        if(json.success)
        {
            localStorage.setItem('token', json.authToken);
            props.showAlert("Account created successfully","success")
            navigate('/');
            
        }
        else{
            props.showAlert(json.error[0].msg,"danger")
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
                    <label htmlFor="name" className="form-label">Name   </label>
                    <input type="text" className="form-control" id="name" value={credentials.name} onChange={handleChange} name="name" aria-describedby="emailHelp" minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={handleChange} name="email" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={handleChange} name="password" minLength={5} required/>
                </div> 
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} onChange={handleChange} name="cpassword" />
                </div> 
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
