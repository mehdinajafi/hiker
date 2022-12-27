import { useCallback, useState } from "react";

export interface UseControllableProps<T> {
  value?: T;
  defaultValue?: T | (() => T);
}

/**
 * The `useControllable` hook returns the state and function that updates the state, just like React.useState does.
 */
function useControllable<T>(props: UseControllableProps<T>) {
  const { value: valueProp, defaultValue } = props;

  const [uncontrolledState, setUncontrolledState] = useState(defaultValue as T);
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : uncontrolledState;

  const setValue = useCallback(
    (next: React.SetStateAction<T>) => {
      const setter = next as (prevState?: T) => T;
      const nextValue = typeof next === "function" ? setter(value) : next;

      if (!controlled) {
        setUncontrolledState(nextValue);
      }
    },
    [controlled, value]
  );

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}

export default useControllable;
