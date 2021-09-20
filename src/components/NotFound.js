import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container">
            <p>Página no encontrada.</p>
            <Link to="/">Volver al catálogo</Link>
        </div>
    );
};

export default NotFound;