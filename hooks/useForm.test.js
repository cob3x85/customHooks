import '@testing-library/jest-dom';
import { useForm } from "../../hooks/useForm";
import { renderHook, act } from "@testing-library/react-hooks";

describe('useFomr Hooks tests', () => {

    const initialForm = {
        email: 'mail@test.com',
        name: 'carlos'
    }

    test('should return a form by default ', () => {
        const { result } = renderHook(() => useForm(initialForm));

        const [data, handleInputChange, reset] = result.current;
        expect(data).toEqual(initialForm);
        expect(typeof handleInputChange).toBe('function');
        expect(typeof reset).toBe('function');
    });

    test('should change the name value of the form', () => {
        const { result } = renderHook(() => useForm(initialForm));
        const [, handleInputChange] = result.current;

        // Simulamos el cambio de nombre
        act(() => {
            handleInputChange({
                target: {
                    name: 'name',
                    value: 'Melissa'
                }
            });
        });

        // Tenemos que refrescar el valor del state
        const [values] = result.current;

        expect(values.name).toBe('Melissa');
        expect(values).toEqual({ ...initialForm, name: 'Melissa' });

    });


    test('should reset the name to the initial value', () => {
        const { result } = renderHook(() => useForm(initialForm));
        const [data, , reset] = result.current;


        act(() => {
            reset();
        });

        // Tenemos que refrescar el valor del state
        const [dataReset] = result.current;

        // Validamos que el valor del nombre sea carlos
        expect(dataReset.name).toBe('carlos');
        // Validamos que el valor del state sea el mismo del initialState
        expect(dataReset).toEqual({ ...initialForm, name: 'carlos' });
    });

});
