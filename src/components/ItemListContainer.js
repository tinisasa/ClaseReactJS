import React, { useState } from 'react';
import ItemCount from './ItemCount';

const item = {
    initial: 1,
    stock: 5
}

const ItemListContainer = ({ greeting }) => {
    const [stock, setStock] = useState(item.stock);

    const addItem = (quantity) => {
        if (quantity <= stock)
            setStock(stock - quantity);
    }

    return (
        <div className="container">
            <h1 className="display-3">{greeting}</h1>
            <p>Stock disponible: {stock}</p>
            <ItemCount initial={item.initial} stock={stock} onAdd={addItem} />
        </div>)
}

export default ItemListContainer;