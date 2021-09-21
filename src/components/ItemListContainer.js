import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getList } from '../firebase/ClientFactory';
import ItemList from './ItemList';

const ItemListContainer = ({ greeting }) => {
    const [items, setItems] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const { id } = useParams();
    let location = useLocation();

    useEffect(() => {
        let categoryId = location.state ? location.state.categoryId : null;
        async function getItems() {
            setisLoading(true);
            await getList('items', categoryId ? categoryId : null).then((response) => {
                !response.length ? setIsEmpty(true) : setItems(response);
            }).catch((error) => {
                console.log('error getting items', error);
            }).finally(() => {
                setisLoading(false);
                console.log('Items loaded correctly');
            })
        }
        getItems();
        return () => {
            console.log('saliendo de category categoryId' + categoryId);
            setItems([]);
            setIsEmpty(false)
        }
        // eslint-disable-next-line
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