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
```

## License

MIT © [incepter](https://github.com/incepter)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
