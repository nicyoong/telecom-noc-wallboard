import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './use-debounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('debounces value changes by the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 500 } }
    );

    expect(result.current).toBe('first');

    rerender({ value: 'second', delay: 500 });
    // Value should not have changed yet
    expect(result.current).toBe('first');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('second');
  });

  it('clears previous timeout when value changes before delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 500 } }
    );

    expect(result.current).toBe('first');

    rerender({ value: 'second', delay: 500 });
    // Advance just past first timeout
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('first');

    rerender({ value: 'third', delay: 500 });
    // Advance past second timeout
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Should be 'third', not 'second'
    expect(result.current).toBe('third');
  });

  it('updates value when delay elapses without further changes', () => {
    const { result } = renderHook(() => useDebounce('initial', 1000));

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('initial');
  });

  it('handles number values correctly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 200 } }
    );

    expect(result.current).toBe(0);

    rerender({ value: 42, delay: 200 });
    expect(result.current).toBe(0);

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe(42);
  });

  it('handles object values correctly', () => {
    const obj1 = { key: 'a' };
    const obj2 = { key: 'b' };

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: obj1, delay: 100 } }
    );

    expect(result.current).toBe(obj1);

    rerender({ value: obj2, delay: 100 });
    expect(result.current).toBe(obj1);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe(obj2);
  });

  it('handles zero delay (immediate update)', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 0 } }
    );

    expect(result.current).toBe('a');

    rerender({ value: 'b', delay: 0 });
    // With 0 delay, the timeout fires on the next tick
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(result.current).toBe('b');
  });

  it('returns debounced value when delay is a large number', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'fast', delay: 10 } }
    );

    expect(result.current).toBe('fast');

    rerender({ value: 'slow', delay: 10000 });
    expect(result.current).toBe('fast');

    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Still 'fast' because new delay is 10000
    expect(result.current).toBe('fast');

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(result.current).toBe('slow');
  });
});
