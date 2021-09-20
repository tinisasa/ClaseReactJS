import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../context/CartContext';
import { addOrder } from '../firebase/clientFactory';
import Checkout from './Checkout';

const CheckoutContainer = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const { items, clearItems } = useContext(CartContext);
    const [createdOrderId, setCreatedOrderId] = useState(null);

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
            status: 'Generada'
        };

        addOrder(newOrder, items)
            .then((response) => {
                console.log("response:", response);
                clearItems();
                setCreatedOrderId(response);
            })
            .catch((error) => console.log(error));

    }
    return (
        <div className="container">
            <h1 className="display-3">Último paso</h1>
            {items && <Checkout items={items} handleFinishPurchase={handleFinishPurchase} total={totalAmount} />}
        </div>)
}

export default CheckoutContainer
