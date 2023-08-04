import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Expenses</h2>
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
      
    </div>
  )
}
