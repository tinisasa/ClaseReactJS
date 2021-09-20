import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getById } from '../firebase/clientFactory';
import OrderDetail from './OrderDetail';

const Order = () => {
    const [order, setOrder] = useState({});
    const [orderDoesntExists, setOrderDoesntExists] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        async function getOrderById() {
            setisLoading(true);
            await getById('items', id).then((response) => {
                setisLoading(false);
                setOrderDoesntExists(false);
                setOrder(response);
            }).catch((error) => {
                error === 'notFound' ? setOrderDoesntExists(true) : console.log('error searching orders', error);
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
