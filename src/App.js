import React from 'react';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

const appName = 'E-Commerce'

const App = () => {
    return <>
        <NavBar appName={appName}></NavBar>
        <ItemListContainer greeting="Bienvenido, lista de productos" />
        <ItemDetailContainer greeting="Item Detail" />
    </>
}

export default App;