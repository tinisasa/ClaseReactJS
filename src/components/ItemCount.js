import React, { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {

    const [count, setCount] = useState(initial);

    function onDecrease() {
        if (count > 1) return setCount(count - 1);
    }
    function onIncrease() {
        if (count < stock) return setCount(count + 1);
    }
    function addProduct() {
        if (stock > 0) {
            onAdd(count);
            setCount(1);
        }
    }

    return (
        <div className="card col-4">
            <div className="card-body">
                <div className="btn-group btn-block mb-2" role="group" aria-label="Selector de unidades">
                    <button type="button" className="btn btn-light" onClick={onDecrease} disabled={count === 1}><i className="ri-subtract-line"></i></button>
                    <button type="button" className="btn btn-light" disabled><span className="text-body">{count}</span></button>
                    <button type="button" className="btn btn-light" onClick={onIncrease} disabled={count >= stock}><i className="ri-add-line"></i></button>
                </div>
                <button type="button" className="btn btn-block btn-primary" disabled={stock === 0} onClick={addProduct}>Agregar al carrito</button>
            </div>
        </div>)
}

export default ItemCount;