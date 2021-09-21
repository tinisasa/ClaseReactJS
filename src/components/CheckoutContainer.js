import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import CartContext from '../context/CartContext';
import { addOrder } from '../firebase/ClientFactory';
import Checkout from './Checkout';

const CheckoutContainer = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const { items, clearItems } = useContext(CartContext);
    let history = useHistory();

    useEffect(() => {
        let total = 0;
        if (items.length > 0) {
            items.map(obj => {
                return total = total + (obj.item.price * obj.quantity);
            });
            setTotalAmount(total);
        }
        else {
            setTotalAmount(0);
        }
    }, [items])

    const handleFinishPurchase = (buyer) => {
        const newItems = items.map(({ item, quantity }) => ({
            item: {
                id: item.id,
                title: item.title,
                price: item.price,
            },
            quantity
        }));
        console.log("newItems", newItems);
        const newOrder = {
            buyer: {
                name: buyer.name,
                phone: buyer.phone,
                email: buyer.email,
            },
            items: newItems,
            total: totalAmount,
            status: 'Generada',
            date: new Date()
        };

        addOrder(newOrder, items)
            .then((response) => {
                console.log("response:", response);
                clearItems();
                history.push('/orders/' + response);
            })
            .catch((error) => console.log(error));

    }
    return (
        <div className="container">
            <h1 className="display-3">Último paso</h1>
            {items.length > 0 && <Checkout items={items} handleFinishPurchase={handleFinishPurchase} total={totalAmount} />}
        </div>)
}

export default CheckoutContainer
