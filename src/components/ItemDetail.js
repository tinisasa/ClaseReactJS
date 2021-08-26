import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../context/CartContext';
import ConfirmPurchase from './ConfirmPurchase';
import ItemCount from './ItemCount';

const ItemDetail = ({ item, itemDoesntExists }) => {
    const [stock, setStock] = useState(1);
    const [initial, setInitial] = useState(1);
    const [added, setAdded] = useState(false);
    const { addItem } = useContext(CartContext);
    const Cta = added ? ConfirmPurchase : ItemCount;

    useEffect(() => {
        setStock(item.stock);
        setInitial(item.initial);
    }, [item]);

    const addItemToCart = (quantity) => {
        if (quantity <= stock) {
            setStock(stock - quantity);
            addItem(item, quantity);
        }
    }

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
