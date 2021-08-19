import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';

const Item = ({ item }) => {
    const [stock, setStock] = useState(item.stock);

    const addItem = (quantity) => {
        if (quantity <= stock)
            setStock(stock - quantity);
    }

    return (
        <div className="col-4" >
            <div className="card mb-4">
                <Link to={`/products/${item.id}`} >
                    <img src={item.pictureUrl} className="card-img-top img-fluid" alt="..."></img>
                </Link>
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

export default Item;