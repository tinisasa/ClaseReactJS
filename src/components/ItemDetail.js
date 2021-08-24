import React, { useEffect, useState } from 'react';
import ConfirmPurchase from './ConfirmPurchase';
import ItemCount from './ItemCount';

const ItemDetail = ({ item, itemDoesntExists }) => {
    const [stock, setStock] = useState(1);
    const [initial, setInitial] = useState(1);
    const [added, setAdded] = useState(false);
    const Cta = added ? ConfirmPurchase : ItemCount;

    useEffect(() => {
        setStock(item.stock);
        setInitial(item.initial);
    }, [item]);

    const addItem = (quantity) => {
        if (quantity <= stock)
            console.log(quantity);
        setStock(stock - quantity);
    }

    const onAdd = (quantity) => {
        addItem(quantity);
        setAdded(true);
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
                        <Cta initial={initial} stock={stock} onAdd={onAdd} />
                    </div>
                </>
            }
        </div>)
}

export default ItemDetail;
