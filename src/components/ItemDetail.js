import React, { useState } from 'react';
import ConfirmPurchase from './ConfirmPurchase';
import ItemCount from './ItemCount';

const ItemDetail = ({ item, initial, stock, itemDoesntExists, addItemToCart, itemIsInCart }) => {
    const [added, setAdded] = useState(false);
    const Cta = added || itemIsInCart ? ConfirmPurchase : ItemCount;

    const onAdd = (quantity) => {
        addItemToCart(quantity);
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
                        <Cta initial={initial} item={item} onAdd={onAdd} />
                    </div>
                </>
            }
        </div>)
}

export default ItemDetail;
