import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../firebase/clientFactory';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = ({ greeting }) => {
    const [item, setItem] = useState({});
    const [itemDoesntExists, setItemDoesntExists] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        async function getItemById() {
            setisLoading(true);
            await getById('items', id).then((response) => {
                setisLoading(false);
                setItemDoesntExists(false);
                setItem(response);
            }).catch((error) => {
                error === 'notFound' ? setItemDoesntExists(true) : console.log('error searching items', error);
            }).finally(() => {
                setisLoading(false)
            })
        }
        getItemById(id);
        return () => {
            console.log('saliendo de category id' + id);
            setItem({});
            setItemDoesntExists(false);
        }
    }, [id]);

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