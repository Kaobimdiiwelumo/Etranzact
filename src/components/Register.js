import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

            const response = await axios.post('http://localhost:8080/auth/register', {
                username: username,  // Make sure these variable names match the API
                password: password,  // expectations (username, password, role).
                role: role
            }).then(res=>{
                navigate("/")
               
            }).catch(err=>{
                alert(err.message);
               console.log(err)
            });

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
                <label>role:</label>
                    <input
                        type="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                <button type="submit">Register</button>
            </form>
        </div>
    );
 }
