import React, { useState } from 'react';

const Checkout = ({ items, handleFinishPurchase, total }) => {
    const [buyer, setBuyer] = useState({ name: '', phone: '', email: '', emailValidation: '' });
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidField, setInvalidField] = useState({ phone: false, email: false });
    const [invalidForm, setInvalidForm] = useState({ status: false, text: '' });

    const handleChange = (e) => {
        const newObj = {
            [e.target.name]: e.target.value
        }
        setBuyer(prevState => {
            return {
                ...prevState,
                ...newObj
            };
        });
    }

    const handleValidation = (e) => {
        switch (e.target.name) {
            case "emailValidation":
                e.target.value !== buyer.email ? setInvalidEmail(true) : setInvalidEmail(false);
                break;
            case "email":
                e.target.value !== buyer.emailValidation && buyer.emailValidation ? setInvalidEmail(true) : setInvalidEmail(false);
            default:
                if (!e.target.validity.valid) {
                    const newValue = { [e.target.name]: true }
                    setInvalidField(prevState => {
                        return {
                            ...prevState,
                            ...newValue
                        };
                    });
                }
                else {
                    const newValue = { [e.target.name]: false }
                    setInvalidField(prevState => {
                        return {
                            ...prevState,
                            ...newValue
                        };
                    });
                }
                console.log(invalidForm)
        }
    }

    const submitForm = () => {
        if (buyer.name === '') { return setInvalidForm({ status: true, text: 'Debes completar el campo Nombre' }) } else { setInvalidForm({ status: false, text: '' }); }
        if (buyer.phone === '') { return setInvalidForm({ status: true, text: 'Debes completar el campo Teléfono' }) } else { setInvalidForm({ status: false, text: '' }); }
        if (buyer.email === '') { return setInvalidForm({ status: true, text: 'Debes completar el campo Email' }) } else { setInvalidForm({ status: false, text: '' }); }
        if (buyer.emailValidation === '') { return setInvalidForm({ status: true, text: 'Debes completar el campo Confirmar email' }) } else { setInvalidForm({ status: false, text: '' }); }
        if (invalidEmail) return;
        if (invalidField.email || invalidField.phone) return;
        return handleFinishPurchase(buyer);
    }

    return (
        <>
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
                            {items.map(({ item, quantity }, $index) =>
                                <tr key={$index}>
                                    <th scope="row">{quantity}x</th>
                                    <td>{item.title}</td>
                                    <td>$ {item.price * quantity}</td>
                                </tr>
                            )}
                            <tr>
                                <th colSpan="2" scope="row">Total:</th>
                                <th >$ {total}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputName">Nombre</label>
                            <input type="text" name="name" value={buyer.name} onChange={handleChange} onBlur={handleValidation} className="form-control" id="inputName" aria-describedby="nameHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPhone">Teléfono</label>
                            <input type="tel" pattern="[0-9]{9}" name="phone" placeholder="099123456" value={buyer.phone} onChange={handleChange} onBlur={handleValidation} className="form-control" id="inputPhone" aria-describedby="phoneHelp" />
                            <small id="phoneHelp" className="form-text text-muted">Dejanos tu teléfono para contactarte por el envío</small>
                            <small id="emailHelp" className="form-text text-danger">&nbsp;{invalidField.phone && 'Introduce un teléfono válido en Uruguay'}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail1">Email</label>
                            <input type="email" name="email" placeholder="nombre@email.com" value={buyer.email} onChange={handleChange} onBlur={handleValidation} className="form-control" id="inputEmail1" aria-describedby="emailHelp" />
                            <small id="emailHelp" className="form-text text-muted">Te enviaremos el estado de la orden por email</small>
                            <small id="emailHelp" className="form-text text-danger">&nbsp;{invalidField.email && 'Introduce un email válido'}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail2">Confirmar email</label>
                            <input type="email" name="emailValidation" className="form-control" value={buyer.emailValidation} onChange={handleChange} onBlur={handleValidation} id="inputEmail2" aria-describedby="emailHelp" />
                            <small id="emailHelp" className="form-text text-danger">&nbsp;{invalidEmail && 'Los emails no coinciden'}</small>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={submitForm}>Finalizar compra</button>
                        {invalidForm && <small id="phoneHelp" className="form-text text-muted">{invalidForm.text}</small>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Checkout
