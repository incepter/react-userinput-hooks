import { useCallback } from 'react';

/**
 * returns a memoized change handler that will be bound to an input
 *
 * @param callback takes ({name, value, ...rest}) as arguments
 * @param mask function to apply to value
 * @param cbArgs callback additional parameters
 */
export default function useMaskedInputHandler({ callback, mask, ...cbArgs }) {
  const eventHandler = ({ target: { name, value } }) => {
    let calculatedValue = value;
    if (mask) {
      calculatedValue = mask(value) || '';
    }
    callback({ name, value: calculatedValue, cbArgs });
  };
  return {
    onChange: useCallback(eventHandler, [callback, mask, cbArgs]),
  };
}
