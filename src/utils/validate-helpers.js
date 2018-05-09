
import globalHelpers from './global-helpers.js';

// cache some methods to call later on
const toString = Object.prototype.toString;

export default {
    /**
     * is a given value Arguments?
     * @category Validate
     */
    isArguments(value) { // fallback check is for IE
        return toString.call(value) === '[object Arguments]' ||
            (value != null && typeof value === 'object' && 'callee' in value);
    },

    /**
     * Check if the given value is an array.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
     */
    isArray(value) { // check native isArray first
        if ( Array.isArray ) {
            return Array.isArray(value);
        }

        return toString.call(value) === '[object Array]';
    },

    isArrayIndex(n) {
        return n >>> 0 === n && n !== 0xFFFFFFFF;
    },

    /**
     * Check if the given value is a boolean value.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
     */
    isBoolean(value) {
        return value === true || value === false || toString.call(value) === '[object Boolean]';
    },

    /**
     * is a given value Char?
     *
     * @category Validate
     */
    isChar(value) {
        return this.isString(value) && value.length === 1;
    },

    /**
     * is a given value Date Object?
     *
     * @category Validate
     */
    isDate(value) {
        return toString.call(value) === '[object Date]';
    },

    /**
     * is a given object a DOM node?
     *
     * @category Validate
     */
    isDomNode(object) {
        return this.isObject(object) && object.nodeType > 0;
    },

    /**
     * Check if a string is a valid mail.
     *
     * @category Validate
     * @param {string} email - The string to check
     * @return {boolean}
     */
    isEmail(email) {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        return regex.test(email);
    },

    /**
     * is a given value empty? Objects, arrays, strings
     *
     * @category Validate
     */
    isEmpty(variable) {
        const emptyVariables = {
            'undefined': true,
            'null': true,
            'number': false,
            'boolean': false,
            'function': false,
            'regexp': false,
            'date': false,
            'error': false,
        };

        const strType = globalHelpers.getType(variable);
        let boolReturn;

        if ( emptyVariables.hasOwnProperty(strType) ) {
            boolReturn = emptyVariables[strType];
        } else {
            switch ( strType ) {
                case 'object':
                    boolReturn = this.isObjectEmpty(variable);
                    break;

                case 'string':
                    boolReturn = variable ? false : true;
                    break;

                case 'array':
                    boolReturn = variable.length ? false : true;
                    break;
            }
        }

        return boolReturn;
    },

    /**
     * is a given value Error object?
     *
     * @category Validate
     */
    isError(value) {
        return toString.call(value) === '[object Error]';
    },

    /**
     * Check if the given value is a function.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a function, else 'false'.
     */
    isFunction(value) { // fallback check is for IE
        return toString.call(value) === '[object Function]' || typeof value === 'function';
    },

    /**
     * Check if a string is a valid JSON.
     *
     * @category Validate
     * @param {string} str - The string to check
     * @return {boolean}
     */
    isJson(str) {
        try {
            const obj = JSON.parse(str);
            return this.isObject(obj);
        } catch (e) {/* ignore */}

        return false;
    },

    /**
     * is a given value null?
     *
     * @category Validate
     */
    isNull(value) {
        return value === null;
    },

    /**
     * Check if the given value is a number.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a number, else 'false'.
     */
    isNumber(value) {
        const isNaN = Number.isNaN || window.isNaN;

        return typeof value === 'number' && ! isNaN(value);
    },

    /**
     * Check if the given value is an object
     *
     * @category Validate
     * @param {*} value - The value to check
     * @return {boolean} Returns 'true' if the given value is an object, else 'false'
     */
    isObject(value) {
        return typeof value === 'object' && value !== null;
    },

    /**
     * Verify if as objects is empty
     *
     * @category Validate
     * @param {object} obj - The object to verify
     * @return {boolean}
     * @example
     *     isObjectEmpty({}); // true
     */
    isObjectEmpty(obj) {
        if ( ! this.isObject(obj) ) {
            return false;
        }

        for ( let x in obj ) {
            if ( {}.hasOwnProperty.call(obj, x) ) {
                return false;
            }
        }

        return true;
    },

    /**
     * Check if the given value is a plain object.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a plain object, else 'false'.
     */
    isPlainObject(value) {
        if ( ! this.isObject(value) ) {
            return false;
        }

        try {
            const {constructor} = value;
            const {prototype} = constructor;

            return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
        } catch (e) {
            return false;
        }
    },

    isPrimitive(obj, type) {
        type = type || typeof obj;

        return obj == null || type === 'string' || type === 'number' || type === 'boolean';
    },

    isRealNaN(obj) {
        // This is only true of NaN
        return obj != null && obj !== obj;
    },

    /**
     * is a given value RegExp?
     *
     * @category Validate
     */
    isRegexp(value) {
        return toString.call(value) === '[object RegExp]';
    },

    /**
     * are given values same type?
     *
     * @category Validate
     */
    isSameType(value, other) {
        const tag = toString.call(value);

        if ( tag !== toString.call(other) ) {
            return false;
        }

        return true;
    },

    /**
     * Check if the given value is a string.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
     */
    isString(value) {
        return toString.call(value) === '[object String]';
    },

    /**
     * Check if the given value is undefined.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is undefined, else 'false'.
     */
    isUndefined(value) {
        return value === undefined;
    },
};
