import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getList } from '../firebase/clientFactory';
import CartWidget from './CartWidget';

const NavBar = ({ appName }) => {
    const [categories, setCategories] = useState([]);
    const [orderId, setOrderId] = useState('');
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

    const handleChange = (e) => {
        setOrderId(e.target.value);
    }
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
            <form className="form-inline my-2 my-lg-0 mr-4" >
                <input className="form-control mr-sm-2" value={orderId} onChange={handleChange} type="search" placeholder="Id de orden" aria-label="Search" />
                <Link class="btn btn-outline-primary my-2 my-sm-0" to={`/orders/${orderId}`}>Buscar orden</Link>
            </form>
            <CartWidget />
        </nav>)
}

export default NavBar;

