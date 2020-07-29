
import { renderHook, act } from '@testing-library/react-hooks';
import { useFetch } from '../../hooks/useFetch';
import '@testing-library/jest-dom';

describe('Test custom hook useFetchGifs', () => {

    test('should return initial state', () => {

        const { result } = renderHook(() => useFetch(`https://www.breakingbadapi.com/api/quotes/1`));
        const { data, loading, error } = result.current; // Valor actual del hook - result.current

        expect(data).toBe(null);
        expect(loading).toBe(true);
        expect(error).toBe(null);

    });

    // Prueba de useEffects
    test('should return an array of images y el loading en false', async () => {
        // necesitamos esperar el resultado de la promesa, usamos waitForNextUpdate
        const { result, waitForNextUpdate } = renderHook(() => useFetch(`https://www.breakingbadapi.com/api/quotes/10`));

        await waitForNextUpdate();

        const { data, loading, error } = result.current; // Valor actual del hook - result.current

        expect(data.length).toBe(1);
        expect(loading).toBe(false);
        expect(error).toBe(null);
    });


    // Prueba de useEffects
    test('should handle the error in the request', async () => {
        // necesitamos esperar el resultado de la promesa, usamos waitForNextUpdate
        const { result, waitForNextUpdate } = renderHook(() => useFetch(`https://reqres.in/apid/users?page=2`));
        // Esperamos la respuesta del API
        await waitForNextUpdate();

        const { data, loading, error } = result.current; // Valor actual del hook - result.current

        expect(data).toBe(null);
        expect(loading).toBe(false);
        expect(error).toBe('No se pudo cargar la informacion');
    });


});
