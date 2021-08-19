import React, { useState } from 'react';
import ItemCount from './ItemCount';

const ItemDetail = ({ item, itemDoesntExists }) => {
    const [stock, setStock] = useState(item.stock);

    const addItem = (quantity) => {
        if (quantity <= stock)
            setStock(stock - quantity);
    }

    return (
        <div className="row">
            {
                itemDoesntExists &&
                <p>Producto no encontrado</p>
            }
            {
                !itemDoesntExists &&
                <>
                    <div className="col-4" >
                        <img src={item.pictureUrl} className="img-fluid" alt="..."></img>
                    </div>
                    <div className="col-8">
                        <h2 className="card-title">{item.title}</h2>
                        <p className="card-text">{item.description}</p>
                        <p className="lead">$ {item.price}</p>
                        <p className="card-text">Stock disponible: {stock}</p>
                        <ItemCount initial={item.initial} stock={stock} onAdd={addItem} />
                    </div>
                </>
            }
        </div>)
}

export default ItemDetail;