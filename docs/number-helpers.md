## Number Methods


### globalHelpers.formatNumber(num[, separator])

Formats an integer number with dots/commas as thousands separators

- **num**:
  - Type: `Integer`
  - Number to format

- **separator** (optional):
  - Type: `String`
  - Default: `'.'`
  - Separator

#### Example

```js
globalHelpers.formatNumber(1234567) // '1.234.567'
globalHelpers.formatNumber(1234567, ',') // '1,234,567'
```


### globalHelpers.milify(number[, decimal])

Convert long numbers into a human-readable format, e.g. 25000 to '25K'

- **number**:
  - Type: `Number`
  - Number to format

- **deciaml** (optional):
  - Type: `Integer`
  - Default: `1`
  - Decimal places

#### Example

```js
globalHelpers.milify(1000) // '1K'
globalHelpers.milify(1000000) // '1M'
globalHelpers.milify(1234567) // '1.23M'
```

### globalHelpers.toNumber(value)

Converts a value to a number if possible.

- **value**:
  - Type: `Mix`
  - The value to convert

```js
globalHelpers.toNumber('123') // 123
globalHelpers.toNumber('123.456') // 123.456
```