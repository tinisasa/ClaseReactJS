import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ItemDetailContainer from "../components/ItemDetailContainer";
import ItemListContainer from "../components/ItemListContainer";
import NavBar from "../components/NavBar";
import NotFound from "../components/NotFound";

const Router = ({ appName }) => {
    return (
        <BrowserRouter>
            <NavBar appName={appName} />
            <Switch>
                <Route exact path="/" component={ItemListContainer} />
                <Route path="/categories/:id" component={ItemListContainer} />
                <Route path="/products/:id" component={ItemDetailContainer} />
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;