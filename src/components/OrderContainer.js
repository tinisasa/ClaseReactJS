import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getById } from '../firebase/ClientFactory';
import OrderDetail from './OrderDetail';

const OrderContainer = () => {
    const [order, setOrder] = useState({});
    const [orderDoesntExists, setOrderDoesntExists] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        async function getOrderById() {
            setisLoading(true);
            await getById('orders', id).then((response) => {
                console.log(response)
                setOrder(response);
                setisLoading(false);
                setOrderDoesntExists(false);
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

export default OrderContainer
