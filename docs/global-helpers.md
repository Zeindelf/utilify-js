## Global Methods

### globalHelpers.camelize(obj)

Recursively transform key strings to camelCase if param is an Object.
If param is string, return an camel cased string.

- **obj**:
  - Type: `Mix`
  - Object or string to transform

```js
var objToCamelize = {
    lower: 'String lower',
    Upper: 'String upper',
    camelCase: 'String with camel Case',
    PascalCase: 'String with pascal case',
    'kebab-case': 'String with kebab case',
    snake_case: 'String with snake case',
    'Key spaced': 'Strign with key spaced',
    '    key  with multiples    spaces   ': 'Key with multiples spaces',
    boolean: true,
    undefined: undefined,
    null: null,
    array: [],
    array_values: ['value one', 'value.two', 'value-three', 'value_four'],
    'deep array object': [
        {
            'level.one': 'Level.One',
        },
    ],
    'deep object': {
        'level.one': 'Level.One',
        'level-two': {
            'value_deep_two': 'Value-Deep Two',
        },
    },
};

globalHelpers.camelize(objToCamelize)

/*
{
    lower: 'String lower',
    upper: 'String upper',
    camelCase: 'String with camel Case',
    pascalCase: 'String with pascal case',
    kebabCase': 'String with kebab case',
    snakeCase: 'String with snake case',
    keySpaced: 'Strign with key spaced',
    keyWithMultiplesSpaces: 'Key with multiples spaces',
    boolean: true,
    undefined: undefined,
    null: null,
    array: [],
    arrayValues: ['value one', 'value.two', 'value-three', 'value_four'],
    deepArrayObject': [
        {
            levelOne: 'Level.One',
        },
    ],
    deepObject: {
        levelOne: 'Level.One',
        levelTwo: {
            'valueDeepTwo': 'Value-Deep Two',
        },
    },
}
*/
```


### globalHelpers.contains(value, elem)

Check if value contains in an element

- **value**:
  - Type: `String`
  - Value to check

- **elem**:
  - Type: `String|Array`
  - String or array

#### Example

```js
var str = 'Lorem ipsum dolor amet';
var arr = ['Lorem', 'ipsum', 'dolor', 'amet'];
globalHelpers.contains('Lorem', str); // true
globalHelpers.contains('lorem', str); // false
globalHelpers.contains('amet', arr); // true
globalHelpers.contains('Dolor', arr); // false
```


### globalHelpers.debounce(func[, wait[, options]])

Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked, or until the next browser frame is drawn. The debounced function comes with a `cancel` method to cancel delayed `func` invocations and a `flush` method to immediately invoke them. Provide `options` to indicate whether `func` should be invoked on the leading and/or trailing edge of the `wait` timeout. The `func` is invoked with the last arguments provided to the debounced function. Subsequent calls to the debounced function return the result of the last `func` invocation.

**@Method from Lodash**

- **func**:
  - Type: `Function`
  - The function to debounce.

- **wait** (optional):
  - Type: `Integer`
  - Default: `0`
  - The number of milliseconds to delay; if omitted, `requestAnimationFrame` is used (if available).

- **options** (optional):
  - Type: `Object`
  - The options object.
    - options.leading = false Specify invoking on the leading edge of the timeout.
    - options.maxWait The maximum time `func` is allowed to be delayed before it's invoked.
    - options.trailing = true Specify invoking on the trailing edge of the timeout.

#### Example

```js
// Avoid costly calculations while the window size is in flux.
$(window).on('resize', globalHelpers.debounce(calculateLayout, 150));

// Invoke `sendMail` when clicked, debouncing subsequent calls.
  $(element).on('click', globalHelpers.debounce(sendMail, 300, {
    'leading': true,
    'trailing': false,
  }));
```


### globalHelpers.getType(variable)

Get variable type

- **variable**:
  - Type: `Mix`
  - Variable to check type

#### Example

```js
globalHelpers.getType(123); // 'number'
globalHelpers.getType([]); // 'array'
globalHelpers.getType({}); // 'object'
// and so on...
```


### globalHelpers.getUrlParameter(name[, entryPoint])

Get url params from a query string

- **name**:
  - Type: `String`
  - Param name

- **entryPoint** (optional):
  - Type: `String`
  - Default: Actual url
  - Full url or query string

#### Example

```js
// URL: https://site.com?param1=foo&param2=bar
globalHelpers.getUrlParameter('param1'); // foo
globalHelpers.getUrlParameter('param2'); // bar

// Given entry point
var url = 'http://www.site.com?param1=foo&param2=bar&param3=baz';
globalHelpers.getUrlParameter('param3', url); // baz

// Given partial entry point
var url = '?param1=foo&param2=bar&param3=baz';
globalHelpers.getUrlParameter('param2', url); // bar

// Given partial entry point without '?'
var url = 'param1=foo&param2=bar&param3=baz';
globalHelpers.getUrlParameter('param1', url); // foo
```


### globalHelpers.resizeImageByRatio(type, newSize, aspectRatio[, decimal])

Resize image by aspect ratio

- **type**:
  - Type: `String`
  - Resize by 'width' or 'height'

- **newSize**:
  - Type: `Number`
  - New value to resize

- **aspectRatio**:
  - Type: `Number`
  - Image aspect ratio (calculate by (originalWidth / originalHeight))

- **decimal** (optional):
  - Type: `Number`
  - Default: `4`
  - Max decimal digits

#### Example

```js
globalHelpers.resizeImageByRatio('width', 1920, 16/9); // {width: 1920, height: 1080}
globalHelpers.resizeImageByRatio('height', 150, 16/9, 2); // {width: 266.67, height: 150}
```


### globalHelpers.semverCompare(v1, v2)

Compare two semver version strings, returning -1, 0, or 1

If the semver string `v1` is greater than `v2`, return 1. If the semver string `v2` is greater than `v1`, return -1. If `v1` equals `v2`, return 0

- **v1**:
  - Type: `String`
  - Resize by 'width' or 'height'

- **v2**:
  - Type: `String`
  - Compared semver

#### Example

```js
globalHelpers.semverCompare('1.0.0', '1.0.1'); // -1
globalHelpers.semverCompare('1.0.0', '1.0.0'); // 0
globalHelpers.semverCompare('1.0.0', '0.9.0'); // 1
```




### globalHelpers.stripHost(url)

Removes the host from an url

- **url**:
  - Type: `String`
  - The url

#### Example

```js
globalHelpers.stripHost("http://test.com.br/contact/test"); //  "/contact/test"
```


### globalHelpers.stripHttp(url)

Removes the protocol from an url

- **url**:
  - Type: `String`
  - The url

#### Example

```js
globalHelpers.stripHttp('http://test.com.br/contact/test'); // '//test.com.br/contact/test'
globalHelpers.stripHttp('https://test.com.br/contact/test'); // '//test.com.br/contact/test'
```


### globalHelpers.throttle(func[, wait[, options]])

Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds (or once per browser frame). The throttled function comes with a `cancel` method to cancel delayed `func` invocations and a `flush` method to immediately invoke them. Provide `options` to indicate whether `func` should be invoked on the leading and/or trailing edge of the `wait` timeout. The `func` is invoked with the last arguments provided to the throttled function. Subsequent calls to the throttled function return the result of the last `func` invocation.

**@Method from Lodash**

- **func**:
  - Type: `Function`
  - The function to throttle.

- **wait** (optional):
  - Type: `Integer`
  - Default: `0`
  - The number of milliseconds to throttle invocations to; if omitted, `requestAnimationFrame` is used (if available).

- **options** (optional):
  - Type: `Object`
  - The options object.
    - options.leading = true Specify invoking on the leading edge of the timeout.
    - options.trailing = true Specify invoking on the trailing edge of the timeout.

#### Example

```js
// Avoid excessively updating the position while scrolling.
$(window).on('scroll', globalHelpers.throttle(updatePosition, 100));

// Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
const throttled = globalHelpers.throttle(renewToken, (1000 * 60 * 5), {'trailing': false});
$(element).on('click', throttled);

// Cancel the trailing throttled invocation.
$(window).on('popstate', throttled.cancel);
```


### globalHelpers.times(n, iteratee)

Invokes the iteratee `n` times, returning an array of the results of each invocation. The iteratee is invoked with one argumentindex).

**@Method from Lodash**

- **n**:
  - Type: `Integer`
  - The number of times to invoke `iteratee`.

- **iteratee**:
  - Type: `Function`
  - The function invoked per iteration.

```js
globalHelpers.times(3, String);
// => ['0', '1', '2']

globalHelpers.times(4, () => 0);
// => [0, 0, 0, 0]
```


### globalHelpers.unserialize(str)

Unserialize a query string into an object

- **str**:
  - Type: `String`
  - The string that will be converted into a object

#### Example

```js
// str can be '?param1=foo&param2=bar&param3=baz', 'param1=foo&param2=bar&param3=baz' or a full url
var url = 'http://www.site.com?param1=foo&param2=bar&param3=baz';
globalHelpers.unserialize(url); // {param1: 'foo', param2: 'bar', param3: 'baz'}
```