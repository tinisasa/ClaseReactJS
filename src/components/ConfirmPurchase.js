import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmPurchase = () => {
    return (
        <Link to="/cart" className="btn btn-block btn-primary" >
            Terminar Compra
        </Link>
    )
}

export default ConfirmPurchase