
import arrayHelpers from './../utils/array-helpers.js';
import globalHelpers from './../utils/global-helpers.js';
import numberHelpers from './../utils/number-helpers.js';
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

    isArrayIndex(n) {
        return validateHelpers.isArrayIndex(n);
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

    isNumeric(value) {
        return validateHelpers, isNumeric(value);
    }

    isObject(value) {
        return validateHelpers.isObject(value);
    }

    isObjectEmpty(obj) {
        return validateHelpers.isObjectEmpty(obj);
    }

    isPercentage(percentage) {
        return validateHelpers.isPercentage(percentage);
    }

    isPlainObject(value) {
        return validateHelpers.isPlainObject(value);
    }

    isPrimitive(obj, type) {
        return validateHelpers.isPrimitive(obj, type);
    }

    isRealNaN(obj) {
        return validateHelpers.isRealNaN(obj);
    }

    isRegExp(value) {
        return validateHelpers.isRegExp(value);
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
    arrayClone(arr) {
        return arrayHelpers.arrayClone(arr);
    }

    arrayCompact(arr) {
        return arrayHelpers.arrayCompact(arr);
    }

    arrayFlatten(arr, level) {
        return arrayHelpers.arrayFlatten(arr, level);
    }

    arrayIntersection(arr1, arr2) {
        return arrayHelpers.arrayIntersection(arr1, arr2);
    }

    arraySample(arr, arg1, arg2) {
        return arrayHelpers.arraySample(arr, arg1, arg2);
    }

    arrayUnique(arr) {
        return arrayHelpers.arrayUnique(arr);
    }

    camelize(str) {
        return globalHelpers.camelize(str);
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

    deepFreeze(obj) {
        return objectHelpers.deepFreeze(obj);
    }

    escape(str) {
        return stringHelpers.escape(str);
    }

    extend(obj, ...args) {
        return objectHelpers.extend(obj, ...args);
    }

    formatNumber(num, separator) {
        return numberHelpers.formatNumber(num, separator);
    }

    getDescendantProp(obj, path) {
        return objectHelpers.getDescendantProp(obj, path);
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

    explode(str, separator, limit) {
        return arrayHelpers.explode(str, separator, limit);
    }

    length(item) {
        return objectHelpers.length(item);
    }

    milify(ugly, decimal) {
        return numberHelpers.milify(ugly, decimal);
    }

    normalizeText(str) {
        return stringHelpers.normalizeText(str);
    }

    objectArraySortByValue(arr, map, key, reverse) {
        return objectHelpers.objectArraySortByValue(arr, map, key, reverse);
    }

    objectSearch(object, needle) {
        return objectHelpers.objectSearch(object, needle);
    }

    objectToArray(obj) {
        return objectHelpers.objectToArray(obj);
    }

    pad(number, size) {
        return stringHelpers.pad(number, size);
    }

    removeAccent(str) {
        return stringHelpers.removeAccent(str);
    }

    resizeImageByRatio(type, newValue, aspectRatio, decimals) {
        return globalHelpers.resizeImageByRatio(type, newValue, aspectRatio, decimals);
    }

    semverCompare(v1, v2) {
        return globalHelpers.semverCompare(v1, v2);
    }

    shuffleArray(array) {
        return arrayHelpers.shuffleArray(array);
    }

    slice(array, start, end) {
        return arrayHelpers.slice(array, start, end);
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

    strCompact(str) {
        return stringHelpers.strCompact(str);
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
        return numberHelpers.toNumber(value);
    }

    trim(str) {
        return stringHelpers.trim(str);
    }

    ucfirst(str) {
        return stringHelpers.ucfirst(str);
    }

    underscore(str) {
        return stringHelpers.underscore(str);
    }

    unescape(str) {
        return stringHelpers.unescape(str);
    }

    unserialize(str) {
        return globalHelpers.unserialize(str);
    }
}

export default GlobalHelpers;
