import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Employees from '../Components/Employees'; 
import Login from '../Components/Login';
import Registration from '../Components/UserReg';
import AddEmployee from '../Components/AddEmployee';
import UpdateEmployee from '../Components/UpdateEmployees';

export default function RouterPaths() {
    return (
        <Routes>
            <Route path ="/" element={<Login />}/>
            <Route path ="/register" element={<Registration/>}/>
            <Route path="/employees" element={<Employees />} />
            <Route path="/add" element ={<AddEmployee/>}/>
            <Route exact path= "/update/:id" element = {<UpdateEmployee/>}/>
        </Routes>
    );
}
