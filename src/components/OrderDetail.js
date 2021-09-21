import React from 'react'
import { Link } from 'react-router-dom'

const OrderDetail = ({ order, orderDoesntExists }) => {
    return (
        <div className="row">
            <div className="col">
                {
                    orderDoesntExists &&
                    <>
                        <p>Orden no encontrada</p>
                        <p><Link to="/">Volver al catálogo</Link></p>
                    </>
                }
                {
                    !orderDoesntExists &&
                    <>
                        <div className="card-body">
                            <h2 className="card-title">Detalle de orden</h2>
                            <p className="card-text">Fecha: {order.date.toDate().toLocaleDateString()}</p>
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
        </div>
    )
}

export default OrderDetail
