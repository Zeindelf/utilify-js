
import arrayHelpers from './../utils/array-helpers.js';
import globalHelpers from './../utils/global-helpers.js';
import objectHelpers from './../utils/object-helpers.js';
import stringHelpers from './../utils/string-helpers.js';
import validateHelpers from './../utils/validate-helpers.js';

/**
 * Create a GlobalHelpers class
 * Javascript utilities methods
 */
class GlobalHelpers {
    /**
     * Validate type methods
     */
    isArguments(value) {
        return validateHelpers.isArguments(value);
    }

    isArray(value) {
        return validateHelpers.isArray(value);
    }

    isBoolean(value) {
        return validateHelpers.isBoolean(value);
    }

    isChar(value) {
        return validateHelpers.isChar(value);
    }

    isDate(value) {
        return validateHelpers.isDate(value);
    }

    isDomNode(object) {
        return validateHelpers.isDomNode(object);
    }

    isEmail(email) {
        return validateHelpers.isEmail(email);
    }

    isEmpty(variable) {
        return validateHelpers.isEmpty(variable);
    }

    isError(value) {
        return validateHelpers.isError(value);
    }

    isFunction(value) {
        return validateHelpers.isFunction(value);
    }

    isJson(str) {
        return validateHelpers.isJson(str);
    }

    isNull(value) {
        return validateHelpers.isNull(value);
    }

    isNumber(value) {
        return validateHelpers.isNumber(value);
    }

    isObject(value) {
        return validateHelpers.isObject(value);
    }

    isObjectEmpty(obj) {
        return validateHelpers.isObjectEmpty(obj);
    }

    isPlainObject(value) {
        return validateHelpers.isPlainObject(value);
    }

    isRegexp(value) {
        return validateHelpers.isRegexp(value);
    }

    isSameType(value, other) {
        return validateHelpers.isSameType(value, other);
    }

    isString(value) {
        return validateHelpers.isString(value);
    }

    isUndefined(value) {
        return validateHelpers.isUndefined(value);
    }

    /**
     * Global Methods
     */
    arrayCompact(arr) {
        return arrayHelpers.arrayCompact(arr);
    }

    arrayIntersection(arr1, arr2) {
        return arrayHelpers.arrayIntersection(arr1, arr2);
    }

    arrayUnique(arr) {
        return arrayHelpers.arrayUnique(arr);
    }

    capitalize(str) {
        return stringHelpers.capitalize(str);
    }

    chunk(array, size) {
        return arrayHelpers.chunk(array, size);
    }

    cleanArray(array) {
        return arrayHelpers.cleanArray(array);
    }

    contains(value, elem) {
        return globalHelpers.contains(value, elem);
    }

    debounce(func, wait, options) {
        return globalHelpers.debounce(func, wait, options);
    }

    escape(str) {
        return stringHelpers.escape(str);
    }

    extend(obj, ...args) {
        return objectHelpers.extend(obj, ...args);
    }

    getType(variable) {
        return globalHelpers.getType(variable);
    }

    getUrlParameter(name, entryPoint) {
        return globalHelpers.getUrlParameter(name, entryPoint);
    }

    implode(pieces, glue) {
        return arrayHelpers.implode(pieces, glue);
    }

    length(item) {
        return objectHelpers.length(item);
    }

    objectSearch(object, needle) {
        return objectHelpers.objectSearch(object, needle);
    }

    pad(number, size) {
        return stringHelpers.pad(number, size);
    }

    removeAccent(str) {
        return stringHelpers.removeAccent(str);
    }

    resizeImageByRatio(type, newValue, aspectRatio) {
        return globalHelpers.resizeImageByRatio(type, newValue, aspectRatio);
    }

    shuffleArray(array) {
        return arrayHelpers.shuffleArray(array);
    }

    slugifyText(str) {
        return stringHelpers.slugifyText(str);
    }

    stripHost(url) {
        return globalHelpers.stripHost(url);
    }

    stripHttp(url) {
        return globalHelpers.stripHttp(url);
    }

    strReplace(search, replace, subject) {
        return stringHelpers.strReplace(search, replace, subject);
    }

    throttle(func, wait, options) {
        return globalHelpers.throttle(func, wait, options);
    }

    times(n, iteratee) {
        return globalHelpers.times(n, iteratee);
    }

    toNumber(value) {
        return globalHelpers.toNumber(value);
    }

    trim(str) {
        return stringHelpers.trim(str);
    }

    unescape(str) {
        return stringHelpers.unescape(str);
    }

    unserialize(str) {
        return globalHelpers.unserialize(str);
    }
}

export default GlobalHelpers;
