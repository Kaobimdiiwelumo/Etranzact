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

//     const DeleteExpenses = async (e) => {
//         e.preventDefault();
//         setFormLoading(true);
      
//         try {
//           const response = await axios.delete(`http://localhost:8080/api/expenses/${encodeURIComponent(item)}`, {
//             data: { item, amount: Number(amount) },
//           });
      
//           console.log(response.data);
//           resetForm();
//           setFormLoading(false);
//           navigate("/");
//         } catch (err) {
//           console.log(err.message);
//           resetForm();
//           setFormLoading(false);
//         }
//       };
    


//   return (
//     <div>
//       {
//        loading ? "Loading..." :  <div>
//             {
//                  !expense ? "Sorry no expense found for this id 😫" : <div>
//                     <div>Name: {expense.item}</div>
//                     <div>Amount: {expense.amount}</div>
//                     <div>
//                     <form onSubmit={(e)=>DeleteExpenses(e)}>
//                         <input type="hidden" id="id" name="id"/>
//                             <label for="item">Item:</label>
//                             <input type="text" id="item" name="item" defaultValue={expense.item ? expense.item : item}  required onChange={(e)=>setItem(e.target.value)}/>
//                             <br/>
//                             <label for="amount">Amount:</label>
//                             <input type="number" id="amount" name="amount" defaultValue={expense.amount ? expense.amount : amount} required onChange={(e)=>setAmount(e.target.value)}/>
//                             <br/>
//                         {
//                             formLoading ? "Loading..." : <button type="submit" id="deleteButton" >Delete Expense</button>
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

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';

export default function DeleteExpense() {
    const { item } = useParams();
    const navigate = useNavigate();
    const [formLoading, setFormLoading] = useState(false);

    const DeleteExpenses = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        try {
            const response = await axios.delete(`http://localhost:8080/api/expenses/delete/${encodeURIComponent(item)}`);
            console.log(response.data);
            setFormLoading(false);
            navigate("/");
        } catch (err) {
            console.log(err.message);
            setFormLoading(false);
        }
    };

    return (
        <div>
            <h2>Delete Expense - Item: {item}</h2>
            <form onSubmit={DeleteExpenses}>
                {/* Add any other UI elements or confirmation messages here */}
                <button type="submit" disabled={formLoading}>Delete Expense</button>
            </form>
        </div>
    );
}
