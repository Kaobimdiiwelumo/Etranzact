import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.get('http://localhost:8080/user/login',{
                auth:{
                    username: email,  // Use 'username' field for email
                    password: password,
                    }  
            });

            if (response.data != null) {
                localStorage.setItem('user', JSON.stringify({ email, password,}));
                navigate('/employees');
                console.log(response.data);
            }else{
                alert('wrong');
            }
        }catch(error){
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
                        <h4> Sign-in </h4>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                 
                                <input
                                    id="email" placeholder=""
                                    type="text"
                                    
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                    required
                                />
                                <label for="email"> Email </label>:
                            </div>

                            <div className="form-group">
                                
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder=""
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="password">Password</label>:{' '}
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-6 col-sm-offset-3">                                     
                                        <button type="submit" className="btn btn-success btn-lg">
  Login
</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="form-group">
                            <span>
                                New user?<Link to="/register" > <a href="/registration">Register here</a></Link>
                            </span>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}