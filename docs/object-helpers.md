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

globalHelpers.extend({}, obj1, obj2); // {foo: 'Foo', bar: 'Bar', foz: 'Foz', baz: 'Baz'}
```

### globalHelpers.length(item)

Return the length of an item (Object mostly)

- **item**:
  - Type: `Mixed`
  - The String

#### Example

```js
globalHelpers.length('Validate string'); // 15
globalHelpers.length([1, 2, 3, 4, 5]); // 5
globalHelpers.length({foo: 'Foo', bar: 'Bar'}); 2
globalHelpers.length([{foo: 'Foo'}, {bar: 'Bar'}, {baz: 'Baz'}]); 3
```

### globalHelpers.objectSearch(object, needle)

Search through an object recursively and return the first match of the key:value passed

- **object**:
  - Type: `Object`
  - The haystack

- **needle**:
  - Type: `Object`
  - Key value pair that will be searched

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

globalHelpers.objectSearch(data, {id: 4}); // { id: 4, name: 'key 4'};
```