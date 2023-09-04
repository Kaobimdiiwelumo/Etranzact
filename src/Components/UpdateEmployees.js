import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../UpdateEmployee.css';

export default function UpdateEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });

  useEffect(() => {
    const fetchEmployee = async () => {
      let user = localStorage.getItem('user');
      if (user) {
        let userData = JSON.parse(user);
        try {
          const response = await axios.get(`http://localhost:8080/employee/${id}`, {
            auth: {
              username: userData?.email,
              password: userData?.password,
            },
          });
          setEmployee(response.data);
          setFormData({ firstName: response.data.firstName, lastName: response.data.lastName, email: response.data.email });
          setLoading(false);
        } catch (err) {
          setEmployee(null);
          setLoading(false);
          console.log(err.message);
        }
      }
    };
    fetchEmployee();
    return () => console.log('clean up');
  }, [id]);

  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  const Update = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    let user = localStorage.getItem('user');
    if (user) {
      let userData = JSON.parse(user);
      try {
        const response = await axios.patch(`http://localhost:8080/employee/update/${id}`, formData, {
          auth: {
            username: userData?.email,
            password: userData?.password,
          },
        });
        console.log(response.data);
        resetForm();
        setFormLoading(false);
        navigate('/employees');
      } catch (err) {
        console.log(err.message);
        resetForm();
        setFormLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          {!employee ? (
            'No employee with this ID'
          ) : (
            <div>
              <div>firstName: {employee.firstName}</div>
              <div>lastName: {employee.lastName}</div>
              <div>email: {employee.email}</div>
              <div className="container">
                <h1>Employee Management System</h1>
                <hr />
                <h2>Update Employee</h2>

                <form onSubmit={Update}>
                  {/* Add hidden form field to handle update */}
                  <input type="hidden" name="id" value={employee.id} />

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-control mb-4 col-4"
                  />

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-control mb-4 col-4"
                  />

                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control mb-4 col-4"
                  />

                  <button type="submit" className="btn btn-info col-2">
                    Update Employee
                  </button>
                </form>

                <hr />

                <Link to="/employees">Back to Employee List</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
