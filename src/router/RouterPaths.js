import React from 'react'
import { Routes, Route } from "react-router-dom";
import Expenses from '../components/Expenses'
import AddExpense from '../components/AddExpense'
import ExpenseDetail from '../components/ExpenseDetail';
import DeleteExpense from '../components/DeleteExpense';

export default function RouterPaths() {
  return (
    <Routes>
    <Route exact path="/" element={<Expenses />} />
    <Route exact path="/add" element={<AddExpense />} />
    <Route path="/details/:id" element={<ExpenseDetail />} />
    <Route path="/delete/:item" element={<DeleteExpense />} />
  </Routes>
  )
}
