import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getList } from '../firebase/clientFactory';
import CartWidget from './CartWidget';

const NavBar = ({ appName }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function getCategories() {
            await getList('categories').then((response) => {
                setCategories(response);
            }).catch((error) => {
                console.log('error getting Categories', error);
            }).finally(() => {
                console.log('Categories loaded correctly');
            })
        }
        getCategories();
    }, []);
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <NavLink exact to="/">
                <span className="navbar-brand mb-0 h1">{appName}</span>
            </NavLink>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink exact activeClassName="active" className="nav-link" to="/">
                        Home
                    </NavLink>
                </li>
                {categories.map(({ name, key, id }) =>
                    <li key={key} className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to={{ pathname: `/categories/${key}`, state: { categoryId: id } }}>
                            {name}
                        </NavLink>
                    </li>
                )}
            </ul>
            <CartWidget />
        </nav>)
}

export default NavBar;

