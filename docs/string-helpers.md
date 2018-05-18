## String Methods

### globalHelpers.capitalize(str)

Capitalize a string

- **str**:
  - Type: `String`
  - The String

#### Example

```js
globalHelpers.capitalize('foo bar'); // 'Foo Bar'
```


### globalHelpers.escape(str)

Replace <, >, &, ', " and / with HTML entities.

- **str**:
  - Type: `String`
  - The string to check

#### Example

```js
var markup = '<p>"Lorem ipsum"</p>';

globalHelpers.escape(markup);
// &lt;p&gt;&quot;Lorem ipsum&quot;&lt;&#x2F;p&gt;
```

### globalHelpers.normalizeText(str)

Normalize text adding first character to upper after punctuations (. ? !)

- **str**:
  - Type: `String`
  - The text

```js
globalHelpers.normalizeText('foo bar foz. Foo Bar  Foz! foo foo?') // 'Foo bar foz. Foo bar foz! Foo foo?'
```


### globalHelpers.pad(number[, size])

Zero padding number

- **number**:
  - Type: `Integer`
  - Number to format

- **size** (optional):
  - Type: `Integer`
  - Default: `2`
  - Digits limit

#### Example

```js
globalHelpers.pad(1, 1); // 1
globalHelpers.pad(1); // 01
globalHelpers.pad(5); // 05 
globalHelpers.pad(10); // 10
globalHelpers.pad(1.1); // 1.1
globalHelpers.pad(255); // 255
globalHelpers.pad(2.55); // 2.55
globalHelpers.pad(1, 2); // 01
globalHelpers.pad(9, 2); // 09
globalHelpers.pad(10, 2); // 10
globalHelpers.pad(10, 3); // 010
...
```


### globalHelpers.removeAccent(str)

Remove accents from a strin

- **str**:
  - Type: `String`
  - The string to remove accents

#### Example

```js
globalHelpers.removeAccent('Olá Mündô!'); // 'Ola Mundo!'
```


### globalHelpers.slugifyText(str)

Slugify a text, removing/replacing all special characters and spaces with dashes '-'

- **str**:
  - Type: `String`
  - The string to sanitize

#### Example

```js
globalHelpers.slugifyText('Olá Mundo!'); // 'ola-mundo'
```


### globalHelpers.strCompact(str)

Compacts whitespace in the string to a single space and trims the ends.

- **str**:
  - Type: `String`
  - String to remove spaces

#### Example

```js
globalHelpers.strCompact('  Foo  Bar    Baz  ') // 'Foo Bar Baz'
```


### globalHelpers.strReplace(search, replace, subject)

Multiple string replace, PHP str_replace clone

- **search**:
  - Type: `String | Array`
  - The value being searched for, otherwise known as the needle. An array may be used to designate multiple needles.

- **replace**:
  - Type: `String | Array`
  - The replacement value that replaces found search values. An array may be used to designate multiple replacements.

- **subject**:
  - Type: `String`
  - The subject of the replacement

#### Example

```js
globalHelpers.strReplace(['olá', 'mundo'], ['hello', 'world'], 'olá mundo'); // 'hello world'
globalHelpers.strReplace(['um', 'dois'], 'olá', 'um dois três'); // Output 'olá olá três'
```


### globalHelpers.trim(str)

Remove leading and trailing empty spaces.

- **str**:
  - Type: `String`
  - The string

```js
globalHelpers.trim('  Foo  ') // 'Foo'
```

### globalHelpers.ucfirst(str)

Make a string's first character uppercase

- **str**:
  - Type: `String`
  - The string

```js
globalHelpers.ucfirst('foo bar foz') // 'Foo bar foz'
```


### globalHelpers.underscore(str)

Converts hyphens and camel casing to underscores.

**@Method from SugarJS**

- **str**:
  - Type: `String`
  - String to convert

```js
globalHelpers.underscore('camelCase') // 'camel_case'
globalHelpers.underscore('kebab-case') // 'kebab_case'
```


### globalHelpers.unescape(str)

Replaces HTML encoded entities with <, >, &, ', " and /.

- **str**:
  - Type: `String`
  - The string to check

```js
var markup = '&lt;p&gt;&quot;Lorem ipsum&quot;&lt;&#x2F;p&gt;';

globalHelpers.unescape(markup);
// <p>"Lorem ipsum"</p>
```