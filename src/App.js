import React from 'react';
import ItemListContainer from './components/ItemListContainer';
import NavBar from './components/NavBar';

const appName = 'E-Commerce'

const App = () => {
    return <>
        <NavBar appName={appName}></NavBar>
        <ItemListContainer greeting="Bienvenido" />
    </>
}

export default App;