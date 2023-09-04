import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../UserReg.css';

export default function Registration() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Ensure that the password state is initialized correctly
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const register = async (e) => {
        e.preventDefault();

        try {
            const registrationData = {
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: password, // Ensure that the password value is correctly assigned
            };
            console.log('Registration Data:', registrationData); // Add this line to log the data being sent

            const response = await axios.post('http://localhost:8080/registration/new', registrationData);
            
            if (response.data != null) {
                navigate('/');
            } else {
                alert('Could not register new user.');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                    <h1>Employee Management System</h1>
                        <h3>by Etranzact</h3>
                        <h4>Registration</h4>
                        <form onSubmit={(e) => register(e)}>
                            <div className="form-group">
                                
                                <input
                                    id="firstName" placeholder=''
                                    className="form-control"
                                    required
                                    autoFocus
                                    name="firstName"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                                <label className="control-label" for="firstName">
                                    First Name
                                </label>
                            </div>
                            <div className="form-group">
                                
                                <input
                                    id="lastName" placeholder=''
                                    className="form-control"
                                    required
                                    autoFocus
                                    name="lastName"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                                <label className="control-label" for="lastName">
                                    Last Name
                                </label>
                            </div>
                            <div className="form-group">
                                
                                <input
                                    id="email" placeholder=''
                                    type='email'
                                    className="form-control"
                                    required
                                    autoFocus
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    
                                />
                                <label className="control-label" htmlFor="email">
                                    Email
                                </label>
                            </div>
                            <div className="form-group">
                                
                                <input
                                    id="password" placeholder=''
                                    type="password"
                                    className="form-control"
                                    required
                                    autoFocus
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label className="control-label" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success">
                                    Register
                                </button>
                                <span>
                                    Already registered?{' '}
                                    <a href="/">Login here</a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}