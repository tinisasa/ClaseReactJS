import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getFirestore } from '../firebase/clientFactory';
import CartWidget from './CartWidget';

const NavBar = ({ appName }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function getCategories() {
            const db = getFirestore();
            const itemCollection = db.collection("categories").orderBy("name", "asc");
            await itemCollection.get().then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    console.log('No results!');
                }
                setCategories(querySnapshot.docs.map(doc => {
                    const obj = { id: doc.id, ...doc.data() }
                    return obj;
                }))
            }).catch((error) => {
                console.log('error searching items', error);
            }).finally(() => {
                console.log('finalizado correctamente');
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
                {categories.map(({ name, id }) =>
                    <li key={id} className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to={`/categories/${id}`}>
                            {name}
                        </NavLink>
                    </li>
                )}
            </ul>
            <CartWidget />
        </nav>)
}

export default NavBar;

