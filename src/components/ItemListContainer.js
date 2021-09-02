import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore } from '../firebase/clientFactory';
import ItemList from './ItemList';

const ItemListContainer = ({ greeting }) => {
    const [items, setItems] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        async function getItems() {
            setisLoading(true);
            const db = getFirestore();
            const itemCollection = db.collection("items");
            const filterByCategoryId = itemCollection.where('categoryId', '==', id ? id : '');
            const query = id ? filterByCategoryId : itemCollection;
            await query.limit(20).get().then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    console.log('No results!');
                    setIsEmpty(true);
                }
                setItems(querySnapshot.docs.map(doc => {
                    const obj = { id: doc.id, ...doc.data() }
                    return obj;
                }))
            }).catch((error) => {
                console.log('error searching items', error);
            }).finally(() => {
                setisLoading(false)
            })
        }
        getItems();
        return () => {
            console.log('saliendo de category id' + id);
            setItems([]);
            setIsEmpty(false)
        }
    }, [id]);

    return (
        <div className="container">
            <h1 className="display-3">{greeting}</h1>
            {
                isLoading ?
                    <p>Cargando...</p> :
                    <ItemList items={items} isEmpty={isEmpty} />
            }
        </div>)
}

export default ItemListContainer;