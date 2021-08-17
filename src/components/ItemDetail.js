import React, { useState } from 'react';
import ItemCount from './ItemCount';

const ItemDetail = ({ item }) => {
    const [stock, setStock] = useState(item.stock);

    const addItem = (quantity) => {
        if (quantity <= stock)
            setStock(stock - quantity);
    }

    return (
        <div className="col-4 ml-1 mr-1" >
            <div className="card">
                <img src={item.pictureUrl} className="card-img-top img-fluid" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">$ {item.price}</p>
                    <p className="card-text">Stock disponible: {stock}</p>
                    <ItemCount initial={item.initial} stock={stock} onAdd={addItem} />
                </div>
            </div>
        </div>)
}

export default ItemDetail;