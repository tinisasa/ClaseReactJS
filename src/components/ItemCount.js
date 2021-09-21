import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

const ItemCount = ({ item, initial, onAdd, onDelete, onEdit }) => {
    const [count, setCount] = useState(initial);
    let match = useRouteMatch("/cart");
    useEffect(() => {
        setCount(initial);
    }, [initial])

    function onDecrease() {
        if (count > 1) {
            if (match) onEdit(count - 1);
            return setCount(count - 1);
        }
    }
    function onIncrease() {
        if (count < item.stock) {
            if (match) onEdit(count + 1);
            return setCount(count + 1);
        }
    }
    function addProduct() {
        if (item.stock > 0) {
            onAdd(count);
            setCount(1);
        }
    }

    return (
        <>
            <div className="btn-group btn-block mb-2" role="group" aria-label="Selector de unidades">
                {match && count === 1 && <button type="button" className="btn btn-light" onClick={onDelete}><i className="ri-delete-bin-line"></i></button>}
                {match && count > 1 && <button type="button" className="btn btn-light" onClick={onDecrease} disabled={count === 1}><i className="ri-subtract-line"></i></button>}
                {!match && <button type="button" className="btn btn-light" onClick={onDecrease} disabled={count === 1}><i className="ri-subtract-line"></i></button>}
                <button type="button" className="btn btn-light" disabled><span className="text-body">{count}</span></button>
                <button type="button" className="btn btn-light" onClick={onIncrease} disabled={count >= item.stock}><i className="ri-add-line"></i></button>
            </div>
            {!match && <button type="button" className="btn btn-block btn-info" disabled={item.stock === 0} onClick={addProduct}>Agregar al carrito</button>}
        </>)
}

export default ItemCount;
