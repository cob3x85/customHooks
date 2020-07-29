import { useState } from 'react'

// Nos permite crear campos de formulario
// y los regresa como arreglo
export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);


    const handleInputChange = (({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    });

    const reset = ()=>{
        setValues(initialState);
    };

    // Exporta los metodos y propiedades
    return [values, handleInputChange,  reset];
}
