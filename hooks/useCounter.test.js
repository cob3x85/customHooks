import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from '../../hooks/useCounter';



describe('useCounter Hook tests', () => {


    test('should return default values of Hook', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.counter).toBe(10);
        expect(typeof result.current.increment).toBe('function');
        expect(typeof result.current.decrement).toBe('function');
        expect(typeof result.current.reset).toBe('function');

    });

    test('should return counter = 100', () => {
        const { result } = renderHook(() => useCounter(100));

        expect(result.current.counter).toBe(100);

    });

    test('should increment the counter plus 1', () => {
        const { result } = renderHook(() => useCounter(100));

        const { increment } = result.current;
        act(() => {
            increment();
        });

        expect(result.current.counter).toBe(101);

    });


    test('should increment the counter minus 1', () => {

        const { result } = renderHook(() => useCounter(100));
        const { decrement } = result.current;
        act(() => {
            decrement();
        });

        expect(result.current.counter).toBe(99);

    });

    test('should reset the counter to 100', () => {
        const { result } = renderHook(() => useCounter(100));
        const { decrement, reset } = result.current;
        act(() => {
            decrement();
            reset();
        });

        expect(result.current.counter).toBe(100);

    });



});
