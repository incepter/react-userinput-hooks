import React, { useCallback, useState } from 'react';
import { useMaskedInputHandler } from 'react-userinput-hooks';

function App() {
  const [inputValue, setInputValue] = useState('');
  const callback = useCallback(({ value }) => {
    setInputValue(value);
  }, []);
  const { onChange } = useMaskedInputHandler({
    oldValue: inputValue,
    callback,
    mask: value => Number.parseInt(value, 10) || '',
    additionalArg: 'some value',
  });
  return (
    <input name="titi-2" type="text" value={inputValue} onChange={onChange} />
  );
}
export default App;
