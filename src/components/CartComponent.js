import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import ItemCount from './ItemCount';

const CartComponent = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const { items, removeItem, clearItems, editItem } = useContext(CartContext);
    useEffect(() => {
        let total = 0;
        if (items.length > 0) {
            items.map(obj => {
                return total = total + (obj.item.price * obj.quantity);
            });
            setTotalAmount(total);
        }
        else {
            setTotalAmount(0);
        }
    }, [items])

    return (
        <div className="container">
            <div className="col">
                <h1>Carrito</h1>
                {items.length === 0 ?
                    <><p>El carrito se encuentra vacío.</p><Link to="/">Volver al catálogo</Link></>
                    : <button className="btn btn-light mb-3" onClick={clearItems}>Vaciar carrito</button>}
                {items.map((obj) =>
                    <div className="row mb-2" key={obj.item.id} >
                        <div className="col-4" >
                            <img src={obj.item.pictureUrl} className="img-fluid" alt="..."></img>
                        </div>
                        <div className="col-8">
                            <h2 className="card-title">{obj.item.title}</h2>
                            <p className="lead">$ {obj.item.price}</p>
                            <ItemCount item={obj.item} initial={obj.quantity} onEdit={(qty) => editItem(obj.item.id, qty)} onDelete={() => removeItem(obj.item.id)} />
                            <button className="btn btn-light mt-2" onClick={() => removeItem(obj.item.id)}>Eliminar producto</button>
                        </div>
                    </div>
                )}
                <div className="row mb-2">
                    <div className="col text-right">
                        Total: <b>$ {totalAmount}</b>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col text-right">
                        {items.length > 0 && <Link to="checkout" className="btn btn-primary" >Finalizar compra</Link>}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CartComponent;