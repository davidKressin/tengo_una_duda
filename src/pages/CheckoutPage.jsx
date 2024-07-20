import React, { useState } from 'react';
import { WebpayPlus } from '@transbank/webpay-sdk';

const PublicPage = () => {
    const [amount, setAmount] = useState(1000); // Ejemplo de monto en pesos chilenos

    const handleClickPay = async () => {
        const webpayPlus = new WebpayPlus({
            commerceCode: 'tu_codigo_comercio',
            apiKey: 'tu_api_key',
            integrationType: 'TEST' // Cambiar a 'LIVE' para producción
        });

        const response = await webpayPlus.createTransaction({
            amount: amount,
            sessionId: 'id_de_sesion_generado',
            returnUrl: 'https://tu-sitio.com/pago-completado'
        });

        // Redirigir al usuario a la URL de pago
        window.location.href = response.url;
    };

    return (
        <div>
            <h2>Pagar con WebPay</h2>
            <p>Monto a pagar: {amount} CLP</p>
            <button onClick={handleClickPay}>Pagar Ahora</button>
        </div>
    );
};

export default PublicPage;
