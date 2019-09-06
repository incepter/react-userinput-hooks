import { useCallback } from 'react';

/**
 * returns a memoized change handler that will be bound to an input
 *
 * @param callback takes ({name, value, ...rest}) as arguments
 * @param mask function to apply to value
 * @param cbArgs callback additional parameters
 */
export default function useInputChangeHandler({
  callback,
  oldValue,
  mask,
  ...rest
}) {
  const eventHandler = ({ target: { name, value } }) => {
    let calculatedValue = value;
    if (mask) {
      calculatedValue = mask(value) || '';
    }
    if (calculatedValue !== oldValue) {
      callback({ name, value: calculatedValue, ...rest });
    }
  };

  return {
    onChange: useCallback(eventHandler, [callback, mask, oldValue, rest]),
  };
}

export * from './masks';
