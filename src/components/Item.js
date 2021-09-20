import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
    return (
        <div className="col-4" >
            <div className="card mb-4">
                <Link to={`/products/${item.id}`} >
                    {/* TODO: Imagen fija, sin stock, card clickeable */}
                    <img src={item.pictureUrl} className="card-img-top img-fluid" alt="..."></img>
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">$ {item.price}</p>
                </div>
            </div>
        </div>)
}

export default Item;