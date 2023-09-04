import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AddEmployee.css';

export default function AddEmployee() {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
  

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  const postExpenses = async (e) => {
    e.preventDefault();
    setLoading(true);
  

        try {
            const user = localStorage.getItem('user');
            if(user) {
                const userData = JSON.parse(user);
                const response = await axios.post(
                'http://localhost:8080/employee/saveEmployee',
                {
                    firstName,
                    lastName,
                    email,
                },
                {
                auth: {
                    username: userData?.email,  // Use 'username' field for email
                    password: userData?.password
                },
                }
                );
                console.log(response.data);
                resetForm();
                setLoading(false);
                navigate('/employees');
            }
        }
        catch (err) {
            console.log(err.message);
            resetForm();
            setLoading(false);
        }
    };



  return (
    <div className="container">
      <h1>Employee Management System</h1>
      <hr />
      <h2>Save Employee</h2>

      <form onSubmit={postExpenses}>

      <div className="form-group">
      <input
          id='firstname' placeholder=""
          type="text" 
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          
        />
        <label for="firstname"> Employee First Name </label>:
      </div>
       
      <div className="form-group">
      <input
          id='lastname' placeholder=""
          type="text" 
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          
          
        />
        <label for="lastname"> Employee Last Name </label>:
      </div>
        
      <div className="form-group">
      <input
          id='email' placeholder=""
          type="text" 
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          
          
        />
        <label for="email"> Employee Email </label>:
      </div>
        

        <button type="submit" className="btn btn-info col-2">
          Save Employee
        </button>
      </form>

      <hr />

      <a href="/employees">Back to Employee List</a>
    </div>
  );
}

