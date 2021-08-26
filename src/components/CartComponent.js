import React, { useContext } from 'react'
import CartContext from '../context/CartContext';
import ItemCount from './ItemCount';

const CartComponent = () => {
    const { items, removeItem, clearItems, editItem } = useContext(CartContext);

    return (
        <div className="container">
            <div className="col">
                <h1>Carrito</h1>
                {items.length === 0 ?
                    <p>El carrito se encuentra vacío.</p>
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartComponent;