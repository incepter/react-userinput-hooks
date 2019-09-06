export function integerMask(value) {
  return parseInt(value, 10) || '';
}

// https://stackoverflow.com/a/53680448/7104283
export function floatMask(value) {
  return (
    (value && value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')) || ''
  );
}
