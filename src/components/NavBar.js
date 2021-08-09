import React from 'react';
import CartWidget from './CartWidget';

const NavBar = ({ appName }) => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">{appName}</span>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Catálogo</a>
                </li>
            </ul>
            <CartWidget />
        </nav>)
}

export default NavBar;