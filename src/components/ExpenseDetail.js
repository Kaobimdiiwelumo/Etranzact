// import React from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import axios from "axios";
// import { useEffect, useState } from 'react';

// export default function ExpenseDetail() {
//     const {id} = useParams();
//     const navigate = useNavigate()
//     const [expense, setExpense] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [formLoading, setFormLoading] = useState(false);
//     const [item, setItem] = useState("")
//     const [amount, setAmount] = useState("");
//     useEffect(()=>{
//     const fetchExpenses=async()=>{
//         return await axios.get("http://localhost:8080/api/expenses/"+id).then(res=>{
//             setExpense(res.data);
//             setLoading(false)
//         }
//         ).catch(err=>{
//             setExpense(null);
//             setLoading(false)
//             console.log(err.message)
//         });
//     }
//     fetchExpenses();
//     return ()=>console.log("clean up");
//     }, []);

//     const resetForm=()=>{
//         setAmount("");
//         setItem("")
//     }

//     const updateExpenses=async(e)=>{
//         e.preventDefault();
//         setFormLoading(true);
//         return await axios.patch("http://localhost:8080/api/expenses/"+id, {item, amount:Number(amount)}).then(res=>{
//             console.log(res.data);
//             resetForm();
//             setFormLoading(false);
//             navigate("/")
//         }
//         ).catch(err=>{
//             console.log(err.message);
//             resetForm();
//             setFormLoading(false);
//         });
//     }


//   return (
//     <div>
//       {
//        loading ? "Loading..." :  <div>
//             {
//                  !expense ? "Sorry no expense found for this id 😫" : <div>
//                     <div>Name: {expense.item}</div>
//                     <div>Amount: {expense.amount}</div>
//                     <div>
//                     <form onSubmit={(e)=>updateExpenses(e)}>
//                         <input type="hidden" id="id" name="id"/>
//                             <label for="item">Item:</label>
//                             <input type="text" id="item" name="item" defaultValue={expense.item ? expense.item : item}  required onChange={(e)=>setItem(e.target.value)}/>
//                             <br/>
//                             <label for="amount">Amount:</label>
//                             <input type="number" id="amount" name="amount" defaultValue={expense.amount ? expense.amount : amount} required onChange={(e)=>setAmount(e.target.value)}/>
//                             <br/>
//                         {
//                             formLoading ? "Loading..." : <button type="submit" id="createButton" >Update Expense</button>
//                         } 
//                         </form>
//                     </div>
//                  </div>
//             }
//        </div>
//       }
//     </div>
//   )

  
// }

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ExpenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ item: '', amount: '' });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/expenses/${id}`);
        setExpense(res.data);
        setFormData({ item: res.data.item, amount: res.data.amount });
        setLoading(false);
      } catch (err) {
        setExpense(null);
        setLoading(false);
        console.log(err.message);
      }
    };
    fetchExpenses();
    return () => console.log('clean up');
  }, [id]);

  const resetForm = () => {
    setFormData({ item: '', amount: '' });
  };

  const updateExpenses = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const response = await axios.patch(`http://localhost:8080/api/expenses/${id}`, formData);
      console.log(response.data);
      resetForm();
      setFormLoading(false);
      navigate('/');
    } catch (err) {
      console.log(err.message);
      resetForm();
      setFormLoading(false);
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
          {!expense ? (
            "Sorry no expense found for this id 😫"
          ) : (
            <div>
              <div>Name: {expense.item}</div>
              <div>Amount: {expense.amount}</div>
              <div>
                <form onSubmit={(e) => updateExpenses(e)}>
                  <input type="hidden" id="id" name="id" />
                  <label htmlFor="item">Item:</label>
                  <input
                    type="text"
                    id="item"
                    name="item"
                    value={formData.item}
                    required
                    onChange={handleInputChange}
                  />
                  <br />
                  <label htmlFor="amount">Amount:</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    required
                    onChange={handleInputChange}
                  />
                  <br />
                  {formLoading ? (
                    'Loading...'
                  ) : (
                    <button type="submit" id="createButton">
                      Update Expense
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

