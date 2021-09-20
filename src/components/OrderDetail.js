import React from 'react'

const OrderDetail = ({ order, orderDoesntExists }) => {
    return (
        <div className="row">
            {
                orderDoesntExists &&
                <p>Orden no encontrada</p>
            }
            {
                !orderDoesntExists &&
                <>
                    <div className="card-body">
                        <h2 className="card-title">Detalle de orden</h2>
                        <p className="card-text">Nombre: {order.buyer.name}</p>
                        <p className="card-text">Email: {order.buyer.email}</p>
                        <p className="card-text">Teléfono: {order.buyer.phone}</p>
                        <p className="card-text">Estado: {order.status}</p>
                        <p className="card-text">Id: {order.id}</p>
                        <hr />
                        <h4 className="card-title">Productos</h4>
                        <div className="row">
                            <div className="col">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map(({ item, quantity }, $index) =>
                                            <tr key={$index}>
                                                <th scope="row">{quantity}x</th>
                                                <td>{item.title}</td>
                                                <td>$ {item.price * quantity}</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <th colSpan="2" scope="row">Total:</th>
                                            <th >$ {order.total}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default OrderDetail
