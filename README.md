# React Ripple Effect

Ripple Effect Custom Hooks

## Installation
```shell
$ npm install @cube00y-react/use-ripple
```

## Example
```javascript
import { useEffect } from 'react';
import { useRipple } from '@cube00y-react/use-ripple';

function App() {
    useEffect(useRipple);
    
    return (
        <div>
            <div data-ripple="dark">Ripple !!</div>
        </div>
    );
}

export default App;
```

## Option

| Name      | Type   | Values                                                                                          |
|-------------|--------|-------------------------------------------------------------------------------------------------|
| data-ripple | String | <b>Default: rgba(0, 0, 0, 0.35)</b><br><br>dark: rgba(0, 0, 0, 0.35)<br>light: rgba(255, 255, 255, 0.35) |

