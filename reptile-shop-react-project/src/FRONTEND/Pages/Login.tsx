import mongoose from 'mongoose';
import Nav from "../../COMPONENTS/Navbar"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/CreateAccount.css'
const Login: React.FC = () => {
    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginData = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            password: enteredPassword
        };

        try {
           const response = await fetch('http://localhost:5000/user/Login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData),
           });

           if(response.ok){
            const result = await response.json();
            setSuccessMessage('Login Successful');
            localStorage.setItem('token',result.token);
            navigate('/Home')
           }else{
            const errorData = await response.json();
            setError(errorData.error || 'Login Failed');
           }

        } catch (error) {
            console.error("Cannot login", error);
        }

    };

    return (
        
        <div className= 'create-account-container'>
            <h1>Customer Login</h1>
            <form onSubmit = {handleLogin}>
                <div className = "input-group">
                    <input
                    type = "text"
                    placeholder='First Name'
                    value = {enteredFirstName}
                    onChange = {(e) => setEnteredFirstName(e.target.value)}
                    />
                </div>
                <div className ="input-group">
                    <input
                    type = "text"
                    placeholder = "Last Name"
                    value = {enteredLastName}
                    onChange={(e) => setEnteredLastName(e.target.value)}
                    />
                </div>
                <div className = "input-group">
                    <input
                    type = "text"
                    placeholder='Password'
                    value = {enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    />
                </div>
                <button type ="submit" className='login-btn'>Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <p className="login-message">
                    Don't have an account? <Link to="/CreateAccount" className="login-link">Register here</Link>
                </p>
        </div>
        
    )
}
export default Login;