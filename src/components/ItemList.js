import React, { useEffect, useState } from 'react';
import Item from './Item';

const products = [
    {
        id: '1',
        title: 'Producto',
        description: 'buen producto',
        price: 300,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 5
    },
    {
        id: '2',
        title: 'Producto 2',
        description: 'buen producto',
        price: 4500,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 10
    }]

const task = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products);
        }, 2000);
    });

const ItemList = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        async function getItems() {
            await task()
                .then(
                    (result) => {
                        setItems(result);
                    },
                    (err) => console.log(err)
                )
                .finally(() => console.log("Proceso finalizado correctamente"));
        }
        getItems();
    }, []);
    return (
        <div className="d-flex">
            {
                items.length === 0 &&
                <p>Cargando...</p>
            }
            {items.map((item) => <Item key={item.id} item={item} />)}
        </div>)
}

export default ItemList;
