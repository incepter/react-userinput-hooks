import React, { useCallback, useState } from 'react';
import useInputChangeHandler, { floatMask } from 'react-userinput-hooks';

function useInputWithDispatch({
  dispatch,
  action,
  oldValue,
  mask,
  ...actionParams
}) {
  let realAction = action;
  if (typeof action !== 'function') {
    realAction = ({ name, value, ...other }) => ({
      type: action,
      payload: { name, value, ...other },
    });
  }

  const callback = ({ name, value }) => {
    dispatch(realAction({ name, value, ...actionParams }));
  };
  return useInputChangeHandler(oldValue, callback, mask, ...actionParams);
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const callback = useCallback(({ value }) => {
    setInputValue(value);
  }, []);
  const { onChange } = useInputChangeHandler({
    oldValue: inputValue,
    callback,
    mask: floatMask,
    additionalArg: 'some value',
  });
  return (
    <input
      name="inputName"
      type="text"
      value={inputValue}
      onChange={onChange}
    />
  );
}
export default App;
