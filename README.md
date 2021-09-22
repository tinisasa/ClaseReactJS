# Crystals UY E-Commerce

Creado utilizando [create-react-app](https://github.com/facebook/create-react-app) y [react-router](https://github.com/remix-run/react-router)

Para los estilos se usa [bootstrap 4.6](https://getbootstrap.com/docs/4.6/getting-started/introduction/) mediante CDN.

La única dependencia agregada es [dotenv](https://www.npmjs.com/package/dotenv) para variables de ambiente.

A lo largo de la app se hace el uso de componentes funcionales, y hooks como `useEffect`, `useState` y `useContext`

## Instrucciones

`npm start` compila la versión de desarrollo y la ejecuta en `localhost:3000` con un listener para los cambios.

# Archivos en consideración

## Router

Contiene todas las rutas de la aplicación, incluyendo la pantalla de `Not found`

## ClientFactory

En este archivo se hacen los llamados y posteos a Firebase y Firestore.

### `getList(collection, id)`

Trae una lista especificada en el argumento `collection`. El argumento `id` se usa para filtrar una colección de items por categoría.
Devuelve una Promise con la lista de resultados.

### `getById(collection, id)`

Trae un elemento de la `collection` especificada, según el argumento `id`.
Devuelve una Promise con un nuevo objeto con el `id` dentro.

### `addOrder(object, currentItems)`

Agrega una nueva orden `object` a la base de datos. Recibe `currentItems`, array de items en el Carrito, para compararlos con los items en la base y actualizar su stock mediante `batch.update`.
Devuelve una Promise con el `id` de la orden creada.

## CartProvider

En este archivo se maneja la orden que va creando y modificando el usuario, para luego crear la misma en la base de datos.

### `addItem(item, quantity)`

Agrega un `item` al Carrito, y la cantidad `quantity`. Si el `item` ya está en el Carrito, actualiza la cantidad.

### `editItem(id, quantity)`

Edita un `item` dentro del Carrito.

### `remove(id)`

Elimina un `item` dentro del Carrito.

### `clearItems()`

Elimina todos los un `item` dentro del Carrito.

### `checkForItem(id)`

Checkea si existe un `item` dentro del Carrito, y lo devuelve. Usado por `ItemDetailContainer` para actualizar stock disponible si el usuario tiene ese producto ya agregado a su carrito.

### `totalItems`

Cantidad de elementos en el Carrito, sumando las `quantity`(ies) de cada uno.

## Navbar

Consume y disponibiliza las categorías de productos, expone un buscador de Orden por `id`y el widget de Carrito con la cantidad de elementos agregados, con su respectivo link.

## ItemListContainer

Contiene toda la lógica del catálogo de productos. Consume la lista completa en caso de ser la home, en la ruta `/`, o filtrada por categoría si la url es `/categories/{keyword}`. Tiene como `child` a `ItemList` que es su componente de presentación.

## ItemDetailContainer

Contiene toda la lógica del detalle de un producto. Consume el producto con su `id`. Permite agregar el producto al Carrito siempre y cuando haya stock del mismo. Tiene como `child` a `ItemDetail` que es su componente de presentación.

## CartContainer

Contiene toda la lógica del Carrito, usando `CartProvider`. Tiene como `child` a `Cart` que es su componente de presentación.

## CheckoutContainer

Contiene toda la lógica de Checkout, luego de pasar por el Carrito. Aquí el usuario carga sus datos y confirma la orden. Al generar la orden se navega programáticamente a `OrderContainer` con el id de la orden. Tiene como `child` a `Checkout` que es su componente de presentación.

## OrderContainer

Muestra todo el detalle de la Orden generada por el usuario. También se puede acceder mediante el Buscador de Orden en la Navbar. Tiene como `child` a `OrderDetail` que es su componente de presentación.
