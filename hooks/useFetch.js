import { useState, useEffect, useRef } from 'react';

export const useFetch = (url) => {

    const [state, setState] = useState({ data: null, loading: true, error: null });

    //  Error: Can't perform a React state update on an unmounted component.
    // This is a no-op, but it indicates a memory leak in your application.
    // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    const isMounted = useRef(true);


    useEffect(() => {
        return () => {
            // ponemos en falso al desmontar
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({ data: null, loading: true, error: null });

        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                // Validamos si el componente esta montado para evitar el problema de las subscripciones que quedaron colgadas.
                if (isMounted.current) {
                    setState({
                        data: data,
                        error: null,
                        loading: false
                    });
                }
            })
            .catch(()=>{
                setState({
                    data:null,
                    loading: false,
                    error: 'No se pudo cargar la informacion'
                })
            });
    }, [url]);

    return state;

}
