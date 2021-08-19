import React from 'react';
import Item from './Item';

const ItemList = ({ items, categoryDoesntExists }) => {
    return (
        <div className="row">
            {
                categoryDoesntExists &&
                <p>Categoría no encontrada</p>
            }
            {items.map((item) => <Item key={item.id} item={item} />)}
        </div>)
}

export default ItemList;
