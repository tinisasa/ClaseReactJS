import React, { useContext } from 'react'
import CartContext from '../context/CartContext';
import Cart from './Cart'

const CartContainer = () => {
    const { items, removeItem, clearItems, editItem } = useContext(CartContext);
    return (
        <div className="container">
            <Cart
                items={items}
                removeItem={removeItem}
                clearItems={clearItems}
                editItem={editItem}
            />
        </div>
    )
}

export default CartContainer
