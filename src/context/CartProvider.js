import React, { useState, useEffect } from 'react';
import CartContext from './CartContext';

function CartProvider({ defaultValue = [], children }) {
    const [items, setItems] = useState(defaultValue);
    useEffect(() => {
    }, [items])

    const getItemById = (id) => {
        return items.find(obj => obj.item.id === id);
    }

    const isInCart = (id) => {
        return id === undefined ? undefined : getItemById(id);
    }

    const addItem = (item, quantity) => {
        if (isInCart(item && item.id)) {
            const updatedItems = [...items];
            let objToEdit = updatedItems.find(obj => obj.item.id === item.id);
            objToEdit.quantity = objToEdit.quantity + quantity;
            setItems(updatedItems);
            return;
        }
        else {
            setItems([...items, { item: item, quantity: quantity }]);
        }
    }

    const editItem = (id, qty) => {
        const updatedItems = [...items];
        let objToUpdate = updatedItems.find(obj => obj.item.id === id);
        objToUpdate.quantity = qty;
        setItems(updatedItems);
    }

    const removeItem = (id) => {
        const newArr = items.filter((i) => i.item.id !== id);
        setItems(newArr);
    }

    const clearItems = () => setItems([]);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, editItem, isInCart, clearItems, cartSize: items.length }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
