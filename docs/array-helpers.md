## Array Methods

### globalHelpers.arrayClone(arr)

Creates a shallow clone of the array.

- **arr**:
  - Type: `Array`
  - Array to clone

#### Example

```js
globalHelpers.arrayClone([1, 2, 3]); // [1, 2, 3] (it's a new array)
```

### globalHelpers.arrayCompact(arr)

Remove all falsey values from an array.

- **arr**:
  - Type: `Array`
  - Array to filter

#### Example

```js
globalHelpers.arrayCompact([null, a, undefined, 0, false, b, c, '', true]); // [a, b, c, true]
```

### globalHelpers.arrayFlatten(arr[, level])

Returns a flattened, one-dimensional copy of the array.
You can optionally specify a limit, which will only flatten to that depth.

- **arr**:
  - Type: `Array`
  - Array to flatten

- **level** (optional):
  - Type: `Integer`
  - Default: `Infinity`
  - Depth

#### Example

```js
var arrToFlatten = [[1], [], 2, 3, [[4, 5]]];
globalHelpers.arrayFlatten(arrToFlatten); // [1, 2, 3, 4, 5]
```

### globalHelpers.arrayIntersection(arr1, arr2)

Returns a new array containing the intersection between two arrays given.

- **arr1**:
  - Type: `Array`
  - First array

- **arr2**:
  - Type: `Array`
  - Second array

#### Example

```js
globalHelpers.arrayIntersection([1, 2, 3], [2, 3, 4]) // [2, 3]
```

### globalHelpers.arraySample(arr[, num[, remove]])

Returns a random element from the array.
If num is passed, will return an array of num elements.
If remove is true, sampled elements will also be removed from the array.
remove can also be passed in place of num.

- **arr**:
  - Type: `Array`
  - Array to sample

- **num** (optional):
  - Type: `Integer|Boolean`
  - Default: `1`
  - Num of elements

- **remove** (optional):
  - Type: `Boolean`
  - Default: `false`
  - Remove sampled elements

#### Example

```js
var arrSample = [1, 2, 3, 4, 5];

globalHelpers.arraySample(arrSample); // 5
globalHelpers.arraySample(arrSample, 1); // [2]
globalHelpers.arraySample(arrSample, 3); // [3, 4, 1]
```

### globalHelpers.arrayUnique(arr)

Return an array with unique values

- **arr**:
  - Type: `Array`
  - The array

#### Example

```js
globalHelpers.arrayUnique([1, 2, 2, 3, 4, 5, 5, 6]); // [1, 2, 3, 4, 5, 6]
```

### globalHelpers.chunk(array[, size])

Creates an array of elements split into groups the length of size.

If array can't be split evenly, the final chunk will be the remaining elements.

- **array**:
  - Type: `Array`
  - The array

- **size** (optional):
  - Type: `Integer`
  - Default: `1`
  - The length of each chunk

#### Example

```js
var arr = [1, 2, 3, 4, 5, 6, 7];
globalHelpers.chunk(arr, 2); // [1, 2] [3, 4] [5, 6] [7]
```

### globalHelpers.cleanArray(array)

Removes empty index from a array

- **array**:
  - Type: `Array`
  - The array

#### Example

```js
globalHelpers.cleanArray([1, 2, , 3, , , 4]); // [1, 2, 3, 4]
```

### globalHelpers.implode(pieces[, glue])

Join array elements with glue string - PHP implode alike

- **pieces**:
  - Type: `Array | Object`
  - The array|object to implode.  If object it will implode the values, not the keys.

- **glue** (optional):
  - Type: `String`
  - Default: `,`
  - The glue

#### Example

```js
globalHelpers.implode(['Foo', 'Bar']); // 'Foo,Bar'
```

### globalHelpers.shuffleArray(array)

Randomize a array elements with Fisher–Yates shuffle algorithm base

- **array**:
  - Type: `Array`
  - The array to randomize

#### Example

```js
globalHelpers.shuffleArray([1, 2, 3, 4]); // [3, 2, 4, 1]
```

### globalHelpers.slice(array[, start[, end]])

Creates a slice of `array` from `start` up to, but not including, `end`.

**@Method from Lodash**

- **array**:
  - Type: `Array`
  - The array to slice.

- **start** (optional):
  - Type: `Integer`
  - Default: `0`
  - The start position. A negative index will be treated as an offset from the end.

- **end** (optional):
  - Type: `Integer`
  - Default: `array.length`
  - The end position. A negative index will be treated as an offset from the end.

#### Example

```js
var arrSlice = [1, 2, 3, 4, 5];
globalHelpers.slice(arrSlice); // [1, 2, 3, 4, 5]
globalHelpers.slice(arrSlice, 2, 5); // [3, 4, 5]
globalHelpers.slice(arrSlice, 1, 2); // [2]
```