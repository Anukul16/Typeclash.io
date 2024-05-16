import React from 'react';
import Navbar from '../src/components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leaderboard from './navitems/Leaderboard';
import Room from './navitems/Room';
import Login from './navitems/Login';
import Signup from './navitems/Signup';
import Testcontainer from './components/Testcontainer';
import Resetpassword from './components/Resetpassword';
import Account from './navitems/Account';
import '../src/sockets/socket'
import Roomurl from './components/Roomurl';
import Roomtest from './components/Roomtest';
import Parent from './components/Parent';

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Parent />} />
            <Route exact path="/leaderboard" element={<Leaderboard />} />
            <Route exact path="/room" element={<Room />} />
            <Route exact path="/room/create/" element={<Roomurl />} />
            <Route exact path="/room/create/:id" element={<Roomurl />} />
            <Route exact path="/room/test" element={<Roomtest />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path='/reset-password' element={<Resetpassword />}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
