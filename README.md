# react-userinput-hooks

> Hooks for handling user inputs changes with masks

[![NPM](https://img.shields.io/npm/v/react-userinput-hooks.svg)](https://www.npmjs.com/package/react-userinput-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-userinput-hooks
```

## Usage

```jsx
import React, { useCallback, useState } from 'react';
import { useInputChangeHandler } from 'react-userinput-hooks';

function App() {
  const [inputValue, setInputValue] = useState('');
  const callback = useCallback(({ value }) => {
    setInputValue(value);
  }, []);
  const { onChange } = useInputChangeHandler({
    oldValue: inputValue,
    callback,
    mask: value => Number.parseInt(value, 10) || '',
    additionalArg: 'some value',
  });
  return (
    <input name="userId" type="text" value={inputValue} onChange={onChange} />
  );
}
export default App;
```

## Introducing your own hooks
### examples

```jsx
// sometimes, you are using useReducer to store your form values
// or even, your inputs are bound directly to a redux store
// in this case, this hook will provide much help
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
// redux dispatch
import { useDispatch } from 'react-redux';
function useStoreInputChangeHandler({ action, mask, oldValue, ...rest }) {
  const dispatch = useDispatch();
  return useInputWithDispatch({
    dispatch,
    oldValue,
    mask,
    ...rest
  });
}
```
### Introducing some masks to your forms
```jsx
// this also could be extracted to a custom hook
// useIntegerInputStoreChangeHandler ??
// useDecimalInputStoreChangeHandler ??
// anyway, Im using them in production
const { onChange: integerInputChangeHandler } = useStoreInputChangeHandler({
  // changes a [name]: value in my global state
  // a reducer intercepts this action, and the object could be nested anywhere
  action: changeSomeInformation,
  // value => integerMask(value)
  mask: integerMask,
  somethingThat: 'TheActionUses',
  to: 'DefineParentsOrChildren',
});
  
  
```

## License

MIT © [incepter](https://github.com/incepter)
