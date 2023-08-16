
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
      let user = localStorage.getItem("user");
      if (user) {
        let userData = JSON.parse(user);
        try {
          const response = await axios.get(`http://localhost:8080/api/expenses/${id}`, {
            auth: {
              username: userData?.username,
              password: userData?.password
            }
          });
          setExpense(response.data);
          setFormData({ item: response.data.item, amount: response.data.amount });
          setLoading(false);
        } catch (err) {
          setExpense(null);
          setLoading(false);
          console.log(err.message);
        }
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

    let user = localStorage.getItem("user");
    if(user){
      let userData = JSON.parse(user);
      try {
        const response = await axios.patch(`http://localhost:8080/api/expenses/${id}`, formData,{
          auth: {
            username: userData?.username,
            password: userData?.password
          }  
        }

        );
        console.log(response.data);
        resetForm();
        setFormLoading(false);
        navigate('/expenses/user/'+user.userId);
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

