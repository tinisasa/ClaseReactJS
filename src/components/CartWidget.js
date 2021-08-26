import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

const CartWidget = () => {
    const { cartSize } = useContext(CartContext);
    return (<Link to="/cart">
        <span><i className="ri-shopping-cart-line"></i></span>
        <span className="badge badge-pill badge-light">{cartSize}</span>
    </Link>
    );
}

export default CartWidget;