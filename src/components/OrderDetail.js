import React from 'react'

const OrderDetail = ({ order, orderDoesntExists }) => {
    return (
        <div className="row">
            {
                orderDoesntExists &&
                <p>Producto no encontrado</p>
            }
            {
                !orderDoesntExists &&
                <>
                    <div className="card-body">
                        <h2 className="card-title">Orden creada</h2>
                        <p className="card-text">Nombre{order.buyer.name}</p>
                        <p className="card-text">Email:{order.buyer.email}</p>
                        <p className="card-text">Teléfono {order.buyer.phone}</p>
                        <hr />
                        <h4 className="card-title">Productos</h4>
                        {order.items.map((obj) => <p className="card-text text-bold">{obj.title} Cantidad: {obj.quantity} Precio: {obj.price}</p>)}
                        <p className="card-text text-bold">Total: {order.total}</p>
                    </div>
                </>
            }
        </div>
    )
}

export default OrderDetail
