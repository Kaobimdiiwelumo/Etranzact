// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function AddExpense() {
//   const [loading, setLoading] = useState(false);
//   const [item, setItem] = useState('');
//   const [amount, setAmount] = useState('');
//   const [userId, setUserId] = useState('');
//   const navigate = useNavigate();

//   const resetForm = () => {
//     setAmount('');
//     setItem('');
//     setUserId('');
//   };

//   const postExpenses = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const user = localStorage.getItem('user');
//       if (user) {
//         const userData = JSON.parse(user);
//         const response = await axios.post(
//           'http://localhost:8080/api/expenses/add',
//           {
//             item,
//             amount: Number(amount),
//             userId: Number(userId),
//           },
//           {
//             auth: {
//               username: userData?.username,
//               password: userData?.password,
//             },
//           }
//         );

//         console.log(response.data);
//         resetForm();
//         setLoading(false);
//         navigate('/expenses/user/'+userId);
//       }
//     } catch (err) {
//       console.log(err.message);
//       resetForm();
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Add your expense</h2>
//       <div>
//         <form onSubmit={postExpenses}>
//           <input type="hidden" id="id" name="id" />
//           <label htmlFor="item">Item:</label>
//           <input
//             type="text"
//             id="item"
//             name="item"
//             value={item}
//             required
//             onChange={(e) => setItem(e.target.value)}
//           />
//           <br />
//           <label htmlFor="amount">Amount:</label>
//           <input
//             type="number"
//             id="amount"
//             name="amount"
//             required
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <br />
//           <label htmlFor="userId">UserID:</label>
//           <input
//             type="number"
//             id="userID"
//             name="userID"
//             value={userId}
//             required
//             onChange={(e) => setUserId(e.target.value)}
//           />
//           <br />
//           {loading ? (
//             'Loading...'
//           ) : (
//             <div>
//               <button type="submit" id="createButton">
//                 Add Expense
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddExpense() {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setAmount('');
    setItem('');
  };

  const postExpenses = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        const response = await axios.post(
          'http://localhost:8080/api/expenses/add',
          {
            item,
            amount: Number(amount),
            userId: userData.userId, // Use userId from localStorage
          },
          {
            auth: {
              username: userData?.username,
              password: userData?.password,
            },
          }
        );

        console.log(response.data);
        resetForm();
        setLoading(false);
        navigate('/expenses/user/' + userData.userId);
      }
    } catch (err) {
      console.log(err.message);
      resetForm();
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add your expense</h2>
      <div>
        <form onSubmit={postExpenses}>
          <input type="hidden" id="id" name="id" />
          <label htmlFor="item">Item:</label>
          <input
            type="text"
            id="item"
            name="item"
            value={item}
            required
            onChange={(e) => setItem(e.target.value)}
          />
          <br />
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          {loading ? (
            'Loading...'
          ) : (
            <div>
              <button type="submit" id="createButton">
                Add Expense
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
