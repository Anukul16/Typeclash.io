import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const [loggedin, setLoggedIn] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('Test');

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (localStorage.getItem('logintoken')) {
                console.log("got it");
                setLoggedIn(true);
                clearInterval(intervalId)
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    const handleNavItemClick = (itemName) => {
        setActiveNavItem(itemName);
    };

    return (
        <div className="container">
            <h1 className="heading">TypeClash.in</h1>
            <div className="nav-container" id="nav-container">
                <ul className="nav">
                    <li className={`nav-item ${activeNavItem === "Test" ? "active" : ""}`} onClick={() => handleNavItemClick("Test")}>
                        <Link to="/" className="nav-link">Test</Link>
                    </li>
                    <li className={`nav-item ${activeNavItem === "Leaderboard" ? "active" : ""}`} onClick={() => handleNavItemClick("Leaderboard")}>
                        <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
                    </li>
                    <li className={`nav-item ${activeNavItem === "Room" ? "active" : ""}`} onClick={() => handleNavItemClick("Room")}>
                        <Link to="/room" className="nav-link">Room</Link>
                    </li>
                    {!(localStorage.getItem('logintoken')) ? (
                        <>
                            <li className={`nav-item ${activeNavItem === "Login" ? "active" : ""}`} onClick={() => handleNavItemClick("Login")}>
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className={`nav-item ${activeNavItem === "Signup" ? "active" : ""}`} onClick={() => handleNavItemClick("Signup")}>
                                <Link to="/signup" className="nav-link">Signup</Link>
                            </li>
                        </>

                    ) : (
                        <li className={`nav-item ${activeNavItem === "Account" ? "active" : ""}`} onClick={() => handleNavItemClick("Account")}>
                            <Link to="/account" className="nav-link">{localStorage.getItem('username')}</Link>
                        </li>
                    )}

                </ul>
            </div>
        </div>
    );
}

export default Navbar;
