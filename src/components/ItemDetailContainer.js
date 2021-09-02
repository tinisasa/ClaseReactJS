import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore } from '../firebase/clientFactory';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = ({ greeting }) => {
    const [item, setItem] = useState({});
    const [itemDoesntExists, setItemDoesntExists] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        async function getItemById() {
            setisLoading(true);
            const db = getFirestore();
            const itemQuery = db.collection("items").doc(id);
            await itemQuery.get().then((doc) => {
                setisLoading(false);
                if (!doc.exists) {
                    console.log('No result!');
                    setItemDoesntExists(true);
                    return;
                }
                setItemDoesntExists(false);
                setItem({ id: doc.id, ...doc.data() })
            }).catch((error) => {
                console.log('error searching items', error);
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