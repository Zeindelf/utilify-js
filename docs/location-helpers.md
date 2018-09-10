## Location Methods

### locationHelpers.getUserLocation()

Get user location by HTML5 Geolocate API and translate coordinates to Brazilian State, City and Region

#### Example

```js
locationHelpers.getUserLocation()
  .then(function(res) {
    window.console.log(res);
    // When success, response are an object with State, City, Region and user Coordinates
  })
  .fail(function(err) {
    window.console.log(err);
  });
```

### locationHelpers.filteredRegion(state)

Get Brazilian region for an state initials given

- **state**:
  - Type: `String`
  - Initials state (e.g. 'SP')

#### Example

```js
locationHelpers.filteredRegion('SP');
//=> Sudeste
```

### locationHelpers.filteredState(state)

Get Brazilian name state and region for an state initials given

- **state**:
  - Type: `String`
  - Initials state (e.g. 'SP')

#### Example

```js
locationHelpers.filteredState('SP');
//=> { initials: 'SP', name: 'São Paulo', region: 'Sudeste' }
```