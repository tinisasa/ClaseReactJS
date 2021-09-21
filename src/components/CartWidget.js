import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

const CartWidget = () => {
    const { totalItems } = useContext(CartContext);
    return (<Link to="/cart" className="btn btn-primary">
        <span><i className="ri-shopping-cart-line"></i></span>&nbsp;
        {totalItems > 0 ? <span className="badge badge-pill badge-light">{totalItems}</span> : ''}
    </Link>
    );
}

export default CartWidget;