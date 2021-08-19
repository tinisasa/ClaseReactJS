import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';

const products = [
    {
        id: '1',
        title: 'Producto',
        description: 'buen producto',
        price: 300,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 5,
        categoryId: '1'
    },
    {
        id: '2',
        title: 'Producto',
        description: 'buen producto',
        price: 300,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 5,
        categoryId: '1'
    },
    {
        id: '3',
        title: 'Producto',
        description: 'buen producto',
        price: 300,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 5,
        categoryId: '1'
    },
    {
        id: '4',
        title: 'Producto',
        description: 'buen producto',
        price: 300,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 5,
        categoryId: '1'
    },
    {
        id: '5',
        title: 'Producto',
        description: 'buen producto',
        price: 300,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 5,
        categoryId: '1'
    },
    {
        id: '6',
        title: 'Producto',
        description: 'buen producto',
        price: 300,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 5,
        categoryId: '2'
    },
    {
        id: '7',
        title: 'Producto',
        description: 'buen producto',
        price: 300,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 5,
        categoryId: '2'
    },
    {
        id: '8',
        title: 'Producto',
        description: 'buen producto',
        price: 300,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 5,
        categoryId: '2'
    },
    {
        id: '9',
        title: 'Producto',
        description: 'buen producto',
        price: 300,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 5,
        categoryId: '3'
    },
    {
        id: '10',
        title: 'Producto 2',
        description: 'buen producto',
        price: 4500,
        pictureUrl: 'https://source.unsplash.com/random/500x500',
        initial: 1,
        stock: 10,
        categoryId: '3'
    }]

const ItemDetailContainer = ({ greeting }) => {
    const [item, setItem] = useState({});
    const [itemDoesntExists, setItemDoesntExists] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        async function getItemById() {
            setisLoading(true);
            await task(id)
                .then(
                    (result) => {
                        setisLoading(false);
                        setItem(result);
                        console.log(result);
                        setItemDoesntExists(false);
                    },
                    (err) => {
                        setisLoading(false);
                        setItemDoesntExists(true)
                    }
                )
                .finally(() => console.log("Proceso finalizado correctamente"));
        }
        getItemById(id);
        return () => {
            console.log('saliendo de category id' + id);
            setItem({});
            setItemDoesntExists(false);
        }
    }, [id]);

    const task = (itemId) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (itemId) {
                    const product = products.filter(i => i.id === itemId);
                    !product.length ? reject('error') : resolve(product[0]);
                }
                else {
                }
            }, 2000);
        });

    return (
        <div className="container">
            <h1 className="display-3">{greeting}</h1>
            {
                isLoading ?
                    <p>Cargando...</p> :
                    <ItemDetail item={item} itemDoesntExists={itemDoesntExists} />
            }
        </div>)
}

export default ItemDetailContainer;