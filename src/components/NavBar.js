import React from 'react';

const NavBar = ({ appName }) => {
    return <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">{appName}</span>
    </nav>
}

export default NavBar;