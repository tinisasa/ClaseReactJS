import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';

const mockCategories = [
    {
        categoryId: 1,
        categoryName: 'Geodas',
    },
    {
        categoryId: 2,
        categoryName: 'Estalactitas',
    },
    {
        categoryId: 3,
        categoryName: 'Amatistas',
    }
]

const NavBar = ({ appName }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function getCategories() {
            await task()
                .then(
                    (result) => {
                        setCategories(result);
                    },
                    (err) => console.log(err)
                )
                .finally(() => console.log("Proceso finalizado correctamente"));
        }
        getCategories();
    }, []);

    const task = () =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(mockCategories);
            }, 200);
        });

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
                {categories.map(({ categoryName, categoryId }) =>
                    <li key={categoryId} className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to={`/categories/${categoryId}`}>
                            {categoryName}
                        </NavLink>
                    </li>
                )}
            </ul>
            <CartWidget />
        </nav>)
}

export default NavBar;

