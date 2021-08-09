import React from 'react';
import CartWidget from './CartWidget';

const NavBar = ({ appName }) => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">{appName}</span>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Catálogo</a>
                </li>
            </ul>
            <CartWidget />
        </nav>)
}

export default NavBar;