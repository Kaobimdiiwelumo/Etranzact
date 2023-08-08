import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

export default function Expenses() {
    const [expenses, setExpenses] = useState([]);
    useEffect(()=>{
    const fetchExpenses=async()=>{
        return await axios.get("http://localhost:8080/api/expenses").then(res=>
        setExpenses(res.data)).catch(err=>{
            setExpenses([]);
            console.log(err.message)
        });
    }
    fetchExpenses();
    return ()=>console.log("clean up");
    }, []);

  return (
    <div className="container-wrapper">
      <div className="container">
      <h2>Expenses</h2>
      <img src="../image.jpg" alt="Expense Image" className="expense-image" />
      <table>
        <tr>
        <th>ID</th>
        <th>Item</th>
        <th>Amount</th>
    </tr>
    {
        expenses && expenses.map(expense=>(
           
            <tr key={expense.id}>  
                <td><Link to={`/details/${expense.id}`}>{expense.id}</Link></td>
                <td><Link to={`/delete/${expense.item}`}>{expense.item}</Link></td>
                <td>{expense.amount}</td>
            </tr>
        ))
      }
      </table>
      {/* Add button to navigate to AddExpense page */}
      <Link to="/add">
        <button>Add Expense</button>
      </Link>
      
    </div>
    </div>
  )
}
