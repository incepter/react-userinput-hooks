import React, { useCallback, useState } from 'react';
import { useMaskedInput } from 'react-userinput-hooks';

function App() {
  const [inputValue, setInputValue] = useState('');
  const callback = useCallback(({ value }) => {
    setInputValue(value);
  }, []);
  const { onChange } = useMaskedInput({
    callback,
    mask: value => value,
  });
  return <input type="text" value={inputValue} onChange={onChange} />;
}
export default App;
