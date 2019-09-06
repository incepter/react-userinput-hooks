import { useCallback } from 'react';

/**
 * returns a memoized change handler that will be bound to an input
 *
 * @param callback takes ({name, value, ...rest}) as arguments
 * @param mask function to apply to value
 * @param cbArgs callback additional parameters
 */
export function useMaskedInputHandler({ callback, oldValue, mask, ...rest }) {
  const eventCallback = ({ name, value }) => {
    callback({ name, value, ...rest });
  };
  const eventHandler = ({ target: { name, value } }) => {
    let calculatedValue = value;
    if (mask) {
      calculatedValue = mask(value) || '';
    }
    if (calculatedValue !== oldValue) {
      eventCallback({ name, value: calculatedValue });
    }
  };
  return {
    onChange: useCallback(eventHandler, [callback, mask]),
  };
}
