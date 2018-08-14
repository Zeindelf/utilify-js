
import validateHelpers from './validate-helpers.js';
import globalHelpers from './global-helpers.js';

export default {
    /**
     * Call Object.freeze(obj) recursively on all unfrozen
     * properties of obj that are functions or objects.
     *
     * @param  {Object} [obj] Object to freeze
     * @return {Object}
     */
    deepFreeze(obj) {
        Object.freeze(obj);

        Object.getOwnPropertyNames(obj).forEach((prop) => {
            if ( obj.hasOwnProperty(prop)
                && obj[prop] !== null
                && (typeof obj[prop] === 'object' || typeof obj[prop] === 'function')
                && !Object.isFrozen(obj[prop])) {
                    this.deepFreeze(obj[prop]);
                }
        });

        return obj;
    },

    /**
     * Extend the given object
     * @param {object} obj - The object to be extended
     * @param {*} args - The rest objects which will be merged to the first object
     * @return {object} The extended object
     */
    extend(obj, ...args) {
        if ( validateHelpers.isObject(obj) && args.length > 0 ) {
            if ( Object.assign ) {
                return Object.assign(obj, ...args);
            }

            args.forEach((arg) => {
                if ( validateHelpers.isObject(arg) ) {
                    Object.keys(arg).forEach((key) => {
                        obj[key] = arg[key];
                    });
                }
            });
        }

        return obj;
    },

    /**
     * A function to take a string written in dot notation style, and use it to
     * find a nested object property inside of an object.
     *
     * @param {Object} obj    The object to search
     * @param {String} path   A dot notation style parameter reference (ie 'a.b.c')
     *
     * @returns the value of the property in question
     */
    getDescendantProp(obj, path) {
        if ( !validateHelpers.isPlainObject(obj) ) {
            throw new TypeError(`'obj' param must be an plain object`);
        }

        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    },

    /**
     * Return the length of an item (Object mostly)
     * @param {mixed}
     * @return {int}
     */
    length(item) {
        if ( !validateHelpers.isUndefined(item.length) ) {
            return item.length;
        }

        if ( validateHelpers.isObject(item) ) {
            return Object.keys(item).length;
        }

        return 0;
    },

    /**
     * Sorting an array of objects by values
     *
     * @param  {Array}   [arr]              An Array of objects
     * @param  {Mix}     [map]              Map to custom order. If value isn't an array with values, will do natural sort
     * @param  {String}  [key]              Object key to use for sorting (accepts dot notation)
     * @param  {Boolean} [reverse=false]    Reverse sorting
     * @returns {Array}                     New object array with sorting values
     * @example
     *     var mapToSort = ['A', 'B', 'C', 'D', 'E']; // Map to sorting
     *
     *     var obj = [{param: 'D'}, {param: 'A'}, {param: 'E'}, {param: 'C'}, {param: 'B'}];
     *     globalHelpers.objectArraySortByValue(objToSortByValue, mapToSort, 'param');
     *     //=> [{param: 'A'}, {param: 'B'}, {param: 'C'}, {param: 'D'}, {param: 'E'}]
     *
     *     // Deep key
     *     var obj = [{deep: {param: 'D'}}, {deep: {param: 'A'}}, {deep: {param: 'E'}}, {deep: {param: 'C'}}, {deep: {param: 'B'}}];
     *     globalHelpers.objectArraySortByValue(objToSortByValue, mapToSort, 'deep.param');
     *     //=> [{deep: {param: 'A'}}, {deep: {param: 'B'}}, {deep: {param: 'C'}}, {deep: {param: 'D'}}, {deep: {param: 'E'}}]
     */
    objectArraySortByValue(arr, map, key, reverse = false) {
        if ( !validateHelpers.isArray(map) || map.length < 1 ) {
            const compare = (a, b, n) => this.getDescendantProp(a, n).toString().localeCompare(this.getDescendantProp(b, n).toString(), undefined, {numeric: true});

            return arr.slice().sort((a, b) => (reverse) ? -compare(a, b, key) : compare(a, b, key));
        }

        return arr.slice().sort((a, b) => {
            const ordered = map.indexOf(this.getDescendantProp(a, key).toString()) - map.indexOf(this.getDescendantProp(b, key).toString());

            return (reverse) ? ordered * -1 : ordered;
        });
    },

    /**
     * Search through an object recursively and return the first match of the key:value passed
     * @access public
     * @param {Object} object - The haystack
     * @param {Object} needle - Key value pair that will be searched
     * @param {Boolean} [caseSensitive=false] Enable/disable case sensitive on search
     * @return {Object}
     * @example
     *     var data = [{
     *         id: 0,
     *         name: 'key 0',
     *         children: [{
     *             id: 1,
     *             name: 'key 1',
     *             children: [{
     *                 id: 2,
     *                 name: 'key 2',
     *                 item: [{
     *                     id: 3,
     *                     name: 'key 3'
     *                 }],
     *                 item: [{
     *                     id: 4,
     *                     name: 'key 4'
     *                 }]
     *             }]
     *         }]
     *     }];
     *     objectSearch(data, {id: 4}); // { id: 4, name: 'key 4'};
     */
    objectSearch(object, needle, caseSensitive = false) {
        let p;
        let key;
        let val;
        let tRet;
        const normalize = (str) => ( caseSensitive ) ? globalHelpers.camelize(str).toLowerCase() : str;

        for ( p in needle ) {
            if ( needle.hasOwnProperty(p) ) {
                key = p;
                val = needle[p];
            }
        }

        for ( p in object ) {
            if ( p === key ) {
                if ( normalize(object[p]) === normalize(val) ) {
                    return object;
                }
            } else if ( object[p] instanceof Object ) {
                if ( object.hasOwnProperty(p) ) {
                    tRet = this.objectSearch(object[p], needle, caseSensitive);
                    if ( tRet ) {
                        return tRet;
                    }
                }
            }
        }

        return false;
    },

    /**
     * Convert object given into an array values
     *
     * @param  {Object}  obj  Object to convert
     * @return {Array}
     * @example
     *     const obj = {a: 'a', b: 'b'};
     *     objectToArray(obj); // ['a', 'b']
     */
    objectToArray(obj) {
        if ( !validateHelpers.isPlainObject(obj) ) {
            throw new Error(`'obj' must be a plain object`);
        }

        return Object.keys(obj).map((key) => obj[key]);
    },
};
