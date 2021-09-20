import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getList } from '../firebase/clientFactory';
import ItemList from './ItemList';

const ItemListContainer = ({ greeting }) => {
    const [items, setItems] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        async function getItems() {
            setisLoading(true);
            await getList('items', id ? id : null).then((response) => {
                !response.length ? setIsEmpty(true) : setItems(response);
            }).catch((error) => {
                console.log('error getting items', error);
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