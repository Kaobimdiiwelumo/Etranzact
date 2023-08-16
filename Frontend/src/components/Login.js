import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:8080/sign-in', {
                auth:{
                username,
                password,
                }
            });

            if (response.data != null) {
                localStorage.setItem('user', JSON.stringify({ username, password, userId:response.data }));
               
                navigate(`/expenses/user/${response.data }`);
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </form>
        </div>
    );
}
