import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';

const product =
{
    id: '3',
    title: 'Producto 3',
    description: 'otro buen producto',
    price: 250,
    pictureUrl: 'https://source.unsplash.com/random/500x500',
    initial: 1,
    stock: 8
}

const ItemDetailContainer = ({ greeting }) => {
    const [item, setItem] = useState([]);
    useEffect(() => {
        async function getItems() {
            await task()
                .then(
                    (result) => {
                        setItem(result);
                    },
                    (err) => console.log(err)
                )
                .finally(() => console.log("Proceso finalizado correctamente"));
        }
        getItems();
    }, []);

    const task = () =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(product);
            }, 2000);
        });

    return (
        <div className="container">
            <h1 className="display-3">{greeting}</h1>
            {
                item.length === 0
                    ? <p>Cargando...</p>
                    : <ItemDetail item={item} />
            }
        </div>)
}

export default ItemDetailContainer;