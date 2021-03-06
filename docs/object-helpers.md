## Object Methods

### globalHelpers.deepFreeze(obj)

Call Object.freeze(obj) recursively on all unfrozen
properties of obj that are functions or objects.

- **obj**:
  - Type: `Object`
  - Object to freeze


### globalHelpers.extend(obj, args)

Extend the given object

- **obj**:
  - Type: `Object`
  - The object to be extended

- **args**:
  - Type: `Object`
  - The rest objects which will be merged to the first object

#### Example

```js
var obj1 = {foo: 'Foo', bar: 'Bar'};
var obj2 = {foz: 'Foz', baz: 'Baz'};

globalHelpers.extend({}, obj1, obj2);
//=> {foo: 'Foo', bar: 'Bar', foz: 'Foz', baz: 'Baz'}
```


### globalHelpers.getDescendantProp(obj, path)

A function to take a string written in dot notation style, and use it to find a nested object property inside of an object.

- **obj**:
  - Type: `Object`
  - The object to search

- **path**:
  - Type: `String`
  - A dot notation style parameter reference `(e.g. 'a.b.c')`

#### Example

```js
vat obj = {
  foo: {
    bar: {
      baz: 'Baz',
      },
  },
};

globalHelpers.getDescendantProp(obj, 'foo.bar.baz');
//=> Baz
```



### globalHelpers.groupObjectByValue(item, key[, camelize])

Group an array of objects by same properties value

Returns new object with a key grouped values

- **item**:
  - Type: `Array`
  - An array of objects

- **key**:
  - Type: `String`
  - The key where the values are grouped

- **camelize** (optional):
  - Type: `Boolean`
  - Default: `false`
  - Camlize key (e.g. `John Smith` or `john-smith` turn into `johnSmith`)

#### Example

```js
var objToGroup = [
    { name: 'John', age: 20 },
    { name: 'Mary', age: 20 },
    { name: 'Smith', age: 18 },
    { name: 'John', age: 22 },
];

groupObjectByValue(objToGroup, 'age');
//=> { 18: [{ name: 'Smith', age: 18 }], 20: [{ name: 'John', age: 20 }, { name: 'Mary', age: 20 }], 22: { name: 'John', age: 22 } }
groupObjectByValue(objToGroup, 'name', true);
//=> { john: [{ name: 'John', age: 22 }, { name: 'John', age: 20 }], mary: [{ name: 'Mary', age: 20 }], smith: [{ name: 'Smith', age: 18 }] }
```



### globalHelpers.length(item)

Return the length of an item (Object mostly)

- **item**:
  - Type: `Mixed`
  - The String

#### Example

```js
globalHelpers.length('Validate string');
//=> 15
globalHelpers.length([1, 2, 3, 4, 5]);
//=> 5
globalHelpers.length({foo: 'Foo', bar: 'Bar'});
//=> 2
globalHelpers.length([{foo: 'Foo'}, {bar: 'Bar'}, {baz: 'Baz'}]);
//=> 3
```


### globalHelpers.objectArraySortByValue(arr, map, key, reverse)

Sorting an array of objects by values

- **arr**:
  - Type: `Array`
  - An Array of objects

- **map**:
  - Type: `Mix`
  - Map to custom order. If value isn't an array with values, will do natural sort `(e.g. 1, 2, 3...a, b, c...)`

- **key**:
  - Type: `String`
  - Object key to use for sorting (accepts dot notation)

- **reverse** (optional):
  - Type: `Boolean`
  - Default: `false`
  - Reverse sorting

#### Example

```js
var arrObj = [{param: 'D'}, {param: 'A'}, {param: 'E'}, {param: 'C'}, {param: 'B'}];
var mapToSort = ['A', 'B', 'C', 'D', 'E'];

globalHelpers.objectArraySortByValue(arrObj, mapToSort, 'param');
//=> [{param: 'A'}, {param: 'B'}, {param: 'C'}, {param: 'D'}, {param: 'E'}]

globalHelpers.objectArraySortByValue(arrObj, mapToSort, 'param', true);
//=> [{param: 'E'}, {param: 'D'}, {param: 'C'}, {param: 'B'}, {param: 'A'}]
```



### globalHelpers.objectSearch(object, needle[, caseSensitive])

Search through an object recursively and return the first match of the key:value passed

- **object**:
  - Type: `Object`
  - The haystack

- **needle**:
  - Type: `Object`
  - Key value pair that will be searched

- **caseSensitive** (optional):
  - Type: `Object`
  - Default: `false`
  - Enable/disable case sensitive on search

#### Example

```js
var data = [{
    id: 0,
    name: 'key 0',
    children: [{
        id: 1,
        name: 'key 1',
        children: [{
            id: 2,
            name: 'key 2',
            item: [{
                id: 3,
                name: 'key 3'
            }],
            item: [{
                id: 4,
                name: 'key 4'
            }]
        }]
    }]
}];

globalHelpers.objectSearch(data, {id: 4});
//=> { id: 4, name: 'key 4'};
```


### globalHelpers.objectToArray(obj)

Convert object given into an array values

- **obj**:
  - Type: `Object`
  - The plain object

#### Example

```js
var obj = {
  a: 'foo',
  b: 'bar'
};

objectToArray(obj);
//=> ['foo', 'bar']
```


### globalHelpers.renameKeys(obj, keysMap)

Replaces the names of multiple object keys with the values provided.

- **obj**:
  - Type: `Object`
  - The plain object

- **keysMap**:
  - Type: `Object`
  - Object with key and value to replace

#### Example

```js
var obj = { name: 'John', surename: 'Smith', age: 20 };

renameKeys(obj, { name: 'firstName', surename: 'lastName' });
//=> { firstName: 'John', lastName: 'Smith', age: 20 }
```