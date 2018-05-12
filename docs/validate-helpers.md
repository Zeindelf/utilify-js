## Validate Methods

### globalHelpers.isArray(value)

Check if the given value is an array.

- **value**:
  - Type: `Mixed`
  - The value to check.

#### Example

```js
globalHelpers.isArray([]); // true
globalHelpers.isArray([{}, {}]); // true
globalHelpers.isArray({}); // false
```

### globalHelpers.isBoolean(value)

Check if the given value is a boolean value.

- **value**:
  - Type: `Mixed`
  - The value to check.

#### Example

```js
globalHelpers.isBoolean(true); // true
globalHelpers.isBoolean(false); // true
globalHelpers.isBoolean(!0); // true
globalHelpers.isBoolean(!1); // true
globalHelpers.isBoolean('true'); // false
globalHelpers.isBoolean('false'); // false
```

### globalHelpers.isEmail(email)

Check if a string is a valid mail.

- **email**:
  - Type: `String`
  - The string to check

#### Example

```js
globalHelpers.isEmail('email@email.com'); // true
globalHelpers.isEmail('email@email'); // false
```

### globalHelpers.isFunction(value)

Check if the given value is a function.

- **value**:
  - Type: `Mixed`
  - The value to check.

#### Example

```js
var foo = function() {};
var bar = '';

globalHelpers.isFunction(foo); // true
globalHelpers.isFunction(bar); // false
```

### globalHelpers.isJson(str)

Check if a string is a valid JSON.

- **str**:
  - Type: `String`
  - The string to check

#### Example

```js
var json = '{"foo": "Foo", "bar": "Bar"}';

globalHelpers.isJson(json); // true
globalHelpers.isJson('json'); // false
```

### globalHelpers.isNumber(value)

Check if the given value is a number.

- **value**:
  - Type: `Mixed`
  - The value to check.

#### Example

```js
globalHelpers.isNumber(123); // true
globalHelpers.isNumber(123.45); // true
globalHelpers.isNumber('string'); // false
```

### globalHelpers.isObject(value)

Check if the given value is an object

- **value**:
  - Type: `Mixed`
  - The String

#### Example

```js
globalHelpers.isObject({foo: 'Foo'}); // true
globalHelpers.isObject('Foo'); // false
```

### globalHelpers.isObjectEmpty(obj)

Verify if as objects is empty

- **obj**:
  - Type: `Object`
  - The object to verify

#### Example

```js
globalHelpers.isObjectEmpty({}); // true
globalHelpers.isObjectEmpty({foo: 'Foo'}); // false
```

### globalHelpers.isPlainObject(value)

Check if the given value is a plain object.

- **value**:
  - Type: `Mixed`
  - The value to check.

#### Example

```js
globalHelpers.isPlainObject({}); // true
globalHelpers.isPlainObject([{}]); // false
globalHelpers.isPlainObject('foo'); // false
```

### globalHelpers.isString(value)

Check if the given value is a string.

- **value**:
  - Type: `Mixed`
  - The value to check.

#### Example

```js
globalHelpers.isString('string'); // true
globalHelpers.isString(123); // false
globalHelpers.isString(123.45); // false
```

### globalHelpers.isUndefined(value)

Check if the given value is undefined.

- **value**:
  - Type: `Mixed`
  - The value to check.

#### Example

```js
globalHelpers.isUndefined(foo); // true

var foo = 'Foo';
globalHelpers.isUndefined(foo); // false
```