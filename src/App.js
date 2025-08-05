import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import MenuView from './components/Admin/MenuView';
import AddMenu from './components/Admin/AddMenu';
import EditMenu from './components/Admin/EditMenu';
import Navbar from './components/Admin/Navbar';
import ReservationView from './components/Admin/ReservationView';
//----------------------------------------------------------------
import RoyalHomePage from './components/User/RoyalHomePage';
import RoyalNavbar from './components/User/RoyalNavbar';

function App() {
  return (
  <>
  <Router>
  <Routes>
         <Route path = '/'
            element = {<MenuView/>}/>
         <Route path = '/addmenu'
            element = {<AddMenu/>}/>
         <Route path = '/editmenu'
            element = {<EditMenu/>}/>
         <Route path = '/reservationview'
            element = {<ReservationView/>}/>
         <Route path = '/homepage'
            element = {<RoyalHomePage/>}/>
        </Routes>
        </Router>
  </>
  );
}

export default App;
