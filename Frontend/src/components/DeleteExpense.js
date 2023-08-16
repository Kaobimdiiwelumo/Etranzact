import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export default function DeleteExpense() {
    const { item } = useParams();
    const navigate = useNavigate();
    const [formLoading, setFormLoading] = useState(false);

    const DeleteExpenses = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        try {
            const user = localStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
                const response = await axios.delete(
                    `http://localhost:8080/api/expenses/delete/${encodeURIComponent(item)}`,
                    {
                        auth: {
                            username: userData?.username,
                            password: userData?.password,
                        },
                    }
                );
                console.log(response.data);
                setFormLoading(false);
                navigate("/expenses/user/"+user.userId);
            }
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
