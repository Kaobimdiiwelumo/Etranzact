import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../Employee.css';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10); // Number of employees displayed per page

  const fetchEmployees = async () => {
    let user = localStorage.getItem('user');
    if (user) {
      let userData = JSON.parse(user);
      try {
        const response = await axios.get('http://localhost:8080/employee/list', {
          auth: {
            username: userData?.email,
            password: userData?.password,
          },
        });
        setEmployees(response.data);
      } catch (err) {
        setEmployees([]);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
    return () => console.log('clean up');
  }, []);

  const DeleteEmployees = async (employeeId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this employee?');
    if (shouldDelete) {
      setFormLoading(true);

      try {
        let user = localStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          const response = await axios.delete(`http://localhost:8080/employee/deleteEmployee/${employeeId}`, {
            auth: {
              username: userData?.email,
              password: userData?.password,
            },
          });
          console.log(response.data);
          setFormLoading(false);
          // Refresh the employee list after successful deletion
          fetchEmployees();
        }
      } catch (err) {
        console.log(err.message);
        setFormLoading(false);
      }
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <div>
      <h1>Employee Management System</h1>
                        <h3>by Etranzact</h3>
      <h4>Employees List</h4>
      <p>Number of Pages: {Math.ceil(employees.length / employeesPerPage)}</p>
      <p>Total Items: {employees.length}</p>
      <table>
        <thead>
          <tr>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <Link to={'/update/' + employee.id}>
                  <button>Update</button>
                </Link>
                <button onClick={() => DeleteEmployees(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={'/add'}>
        <button>Add Employee</button>
      </Link>
    </div>
  );
}
