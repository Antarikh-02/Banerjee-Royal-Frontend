import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MenuView from './components/Admin/MenuView';
import AddMenu from './components/Admin/AddMenu';
import EditMenu from './components/Admin/EditMenu';
import ReservationView from './components/Admin/ReservationView';
import EditReservation from './components/Admin/EditReservation';
//----------------------------------------------------------------
import RoyalHomePage from './components/User/RoyalHomePage';
import RoyalMenu from './components/User/RoyalMenu';


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
         <Route path = '/editreservation'
            element = {<EditReservation/>}/>
         <Route path = '/homepage'
            element = {<RoyalHomePage/>}/>
         <Route path = '/royalmenu'
            element = {<RoyalMenu/>}/>
        </Routes>
        </Router>
  </>
  );
}

export default App;
