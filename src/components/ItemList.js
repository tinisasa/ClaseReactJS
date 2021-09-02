import React from 'react';
import Item from './Item';

const ItemList = ({ items, isEmpty }) => {
    return (
        <div className="row">
            {
                isEmpty &&
                <p>No se encontraron productos para esta categoría.</p>
            }
            {items.map((item) => <Item key={item.id} item={item} />)}
        </div>)
}

export default ItemList;
