import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';


export default function AddExpense() {
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState("")
    const [amount, setAmount] = useState("");

    const resetForm=()=>{
        setAmount("");
        setItem("")
    }

    const postExpenses=async(e)=>{
        e.preventDefault();
        setLoading(true);
        return await axios.post("http://localhost:8080/api/expenses/add", {item, amount:Number(amount)}).then(res=>{
            console.log(res.data);
            resetForm();
            setLoading(false);
        }
        ).catch(err=>{
            console.log(err.message);
            resetForm();
            setLoading(false);
        });
    }
    
  return (
    <div>
      <h2>Add your expense</h2>
      <div>
        <form onSubmit={(e)=>postExpenses(e)}>
        <input type="hidden" id="id" name="id"/>
            <label for="item">Item:</label>
            <input type="text" id="item" name="item" value={item} required onChange={(e)=>setItem(e.target.value)}/>
            <br/>
            <label for="amount">Amount:</label>
            <input type="number" id="amount" name="amount" required value={amount} onChange={(e)=>setAmount(e.target.value)}/>
            <br/>
           {
            loading ? "Loading..." : <button type="submit" id="createButton" >Add Expense</button>
           } 
        </form>
      </div>
    </div>
  )
}
