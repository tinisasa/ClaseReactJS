import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';

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

const ItemListContainer = ({ greeting }) => {
    const [items, setItems] = useState([]);
    const [categoryDoesntExists, setCategoryDoesntExists] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        async function getItems() {
            setisLoading(true);
            await task()
                .then(
                    (result) => {
                        setisLoading(false);
                        if (id) {
                            const newResult = result.filter(i => i.categoryId.toString() === id)
                            !newResult.length ? setCategoryDoesntExists(true) : setCategoryDoesntExists(false);
                            setItems(newResult);
                        }
                        else {
                            setItems(result);
                        }
                    },
                    (err) => console.log(err)
                )
                .finally(() => console.log("Proceso finalizado correctamente"));
        }
        getItems();
        return () => {
            console.log('saliendo de category id' + id);
            setItems([]);
            setCategoryDoesntExists(false)
        }
    }, [id]);

    const task = () =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(products);
            }, 2000);
        });

    return (
        <div className="container">
            <h1 className="display-3">{greeting}</h1>
            {
                isLoading ?
                    <p>Cargando...</p> :
                    <ItemList items={items} categoryDoesntExists={categoryDoesntExists} />
            }
        </div>)
}

export default ItemListContainer;