import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import ItemListContainer from "../components/ItemListContainer";
import ItemDetailContainer from "../components/ItemDetailContainer";
import OrderContainer from "../components/OrderContainer";
import CartContainer from "../components/CartContainer";
import CheckoutContainer from "../components/CheckoutContainer";
import NotFound from "../components/NotFound";

const Router = ({ appName }) => {
    return (
        <BrowserRouter>
            <NavBar appName={appName} />
            <Switch>
                <Route exact path="/" component={ItemListContainer} />
                <Route path="/categories/:id" component={ItemListContainer} />
                <Route path="/products/:id" component={ItemDetailContainer} />
                <Route path="/orders/:id" component={OrderContainer} />
                <Route path="/cart" component={CartContainer} />
                <Route path="/checkout" component={CheckoutContainer} />
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;