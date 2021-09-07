import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getFirestore } from '../firebase/clientFactory';
import OrderDetail from './OrderDetail';

const Order = () => {
    const [order, setOrder] = useState({});
    const [orderDoesntExists, setOrderDoesntExists] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        async function getOrderById() {
            setisLoading(true);
            const db = getFirestore();
            const orderQuery = db.collection("orders").doc(id);
            await orderQuery.get().then((doc) => {
                setisLoading(false);
                if (!doc.exists) {
                    console.log('No result!');
                    setOrderDoesntExists(true);
                    return;
                }
                setOrderDoesntExists(false);
                setOrder({ id: doc.id, ...doc.data() })
                console.log(order);
            }).catch((error) => {
                console.log('error searching orders', error);
                console.log(id);
            }).finally(() => {
                setisLoading(false)
            })
        }
        getOrderById(id);
        return () => {
            setOrder({});
            setOrderDoesntExists(false);
        }
    }, [id]);
    return (
        <div className="container">
            {
                isLoading ?
                    <p>Cargando...</p> :
                    <OrderDetail order={order} orderDoesntExists={orderDoesntExists} />
            }
        </div>)
}

export default Order
