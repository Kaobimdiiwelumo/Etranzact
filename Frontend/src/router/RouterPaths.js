import React from 'react'
import { Routes, Route } from "react-router-dom";
import Expenses from '../components/Expenses'
import AddExpense from '../components/AddExpense'
import ExpenseDetail from '../components/ExpenseDetail';
import DeleteExpense from '../components/DeleteExpense';
import Login from '../components/Login';
import Register from '../components/Register';

export default function RouterPaths() {
  return (
    <Routes>
    <Route exact path="/" element={<Login />} />
    <Route exact path="/register" element={<Register />}/>
    <Route path="/expenses/user/:id" element={<Expenses />} />
    <Route exact path="/add" element={<AddExpense />} />
    <Route path="/details/:id" element={<ExpenseDetail />} />
    <Route path="/delete/:item" element={<DeleteExpense />} />
  </Routes>
  )
}
