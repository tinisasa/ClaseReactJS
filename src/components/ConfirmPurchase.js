import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmPurchase = () => {
    return (
        <Link to="/cart" className="btn btn-block btn-primary" >
            Ir al Carrito
        </Link>
    )
}

export default ConfirmPurchase
