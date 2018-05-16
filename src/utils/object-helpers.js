
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
};
