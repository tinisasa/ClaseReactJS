import React from 'react';
import CartProvider from './context/CartProvider';
import Router from './router/Router';

const appName = 'Crystals UY'

const App = () => {
    return <>
        <CartProvider>
            <Router appName={appName} />
        </CartProvider>
    </>
}

export default App;