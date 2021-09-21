import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { getById } from '../firebase/clientFactory';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = ({ greeting }) => {
    const [item, setItem] = useState({});
    const [itemDoesntExists, setItemDoesntExists] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [initial, setInitial] = useState(1);
    const [stock, setStock] = useState(1);
    const [itemIsInCart, setItemIsInCart] = useState(false);
    const { addItem, checkForItem } = useContext(CartContext);
    const { id } = useParams();
    useEffect(() => {
        async function getProductById() {
            setisLoading(true);
            await getById('items', id).then((response) => {
                setisLoading(false);
                setItemDoesntExists(false);
                setItem(response);
                setStock(response.stock)
                checkForItem(id).then((res) => {
                    setInitial(res.quantity);
                    setStock(response.stock - res.quantity);
                    setItemIsInCart(true);
                }).catch((error) => {
                    console.log('error' + error)
                    return setItemIsInCart(false);
                });
            }).catch((error) => {
                error === 'notFound' ? setItemDoesntExists(true) : console.log('error searching items', error);
            }).finally(() => {
                setisLoading(false)
            })
        }
        getProductById();
        return () => {
            console.log('saliendo de category id' + id);
            setItem({});
            setItemDoesntExists(false);
        }
        // eslint-disable-next-line
    }, [id]);


    const addItemToCart = (quantity) => {
        if (quantity <= stock) {
            addItem(item, quantity);
            setStock(stock - quantity)
        }
    }

    return (
        <div className="container">
            <h1 className="display-3">{greeting}</h1>
            {
                isLoading ?
                    <p>Cargando...</p> :
                    <ItemDetail item={item} initial={initial} stock={stock} addItemToCart={addItemToCart} itemIsInCart={itemIsInCart} itemDoesntExists={itemDoesntExists} />
            }
        </div>)
}

export default ItemDetailContainer;