import React, { useState, useEffect } from 'react';
import CartContext from './CartContext';

function CartProvider({ defaultValue = [], children }) {
    const [items, setItems] = useState(defaultValue);
    const [totalItems, setTotalItems] = useState(0);
    useEffect(() => {
        let totalOfItems = 0;
        if (items.length > 0) {
            items.map(obj => {
                return totalOfItems += obj.quantity;
            })
            console.log('totalOfItems ' + totalOfItems);
            console.log(items);
            console.log('totalITems saved ' + totalItems);
            return setTotalItems(totalOfItems);
        }
        else {
            setTotalItems(0);
        }
        // eslint-disable-next-line
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
        console.log(qty);
        const updatedItems = [...items];
        let objToUpdate = updatedItems.find(obj => obj.item.id === id);
        console.log(objToUpdate.quantity);
        objToUpdate.quantity = qty;
        setItems(updatedItems);
    }

    const removeItem = (id) => {
        const newArr = items.filter((i) => i.item.id !== id);
        setItems(newArr);
    }

    const clearItems = () => setItems([]);

    const checkForItem = (id) => {
        return new Promise((resolve, reject) => {
            if (isInCart(id)) {
                let objToSend = items.find(obj => obj.item.id === id);
                resolve(objToSend);
            }
            else {
                reject('item not in cart');
            }
        })
    }


    return (
        <CartContext.Provider value={{ items, addItem, removeItem, editItem, isInCart, clearItems, checkForItem, totalItems: totalItems }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
