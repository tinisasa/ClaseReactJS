import React from 'react';
import CartWidget from './CartWidget';

const NavBar = ({ appName }) => {
    return (
        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">{appName}</span>
            <CartWidget />
        </nav>)
}

export default NavBar;