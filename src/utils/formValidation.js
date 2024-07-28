

export const formValidation = (type, data) => {
    let isValid = false;
    switch (type) {
        case 'email':
            isValid = /\S+@\S+\.\S+/.test(data);
            break;
        case 'text':
            isValid = typeof data === 'string' && data.trim() !== '';
            break;
        case 'price':
            isValid = !isNaN(data) && data > 0;
            break;
        default:
            throw new Error(`Tipo de validación no soportado: ${type}`);
    }
    return isValid;
};
