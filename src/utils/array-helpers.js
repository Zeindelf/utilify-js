
import validateHelpers from './validate-helpers.js';

export default {
    /**
     * Remove all falsey values from an array.
     *
     * @category Array
     * @param {Array} arr - Array to filter
     * @example
     *     arrayCompact([null, a, undefined, 0, false, b, c, '', true]); // [a, b, c, true]
     */
    arrayCompact(arr) {
        if ( !Array.isArray(arr) ) {
            throw new TypeError('arrayCompact() expects an array.');
        }

        return arr.filter(Boolean);
    },

    /**
     * Returns a new array containing the intersection between two arrays given.
     *
     * @category Array
     * @param {Array} arr1 First array
     * @param {Array} arr2 Second array
     * @return {Array} The intersection
     * @example
     *     arrayIntersection([1, 2, 3], [2, 3, 4]) // [2, 3]
     */
    arrayIntersection(arr1, arr2) {
        return arr1.filter((val) => arr2.indexOf(val) !== -1);
    },

    /**
     * Return an array with unique values
     *
     * @category Array
     * @param {Array} arr - The array
     * @return {Array}
     */
    arrayUnique(arr) {
        return arr.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
    },

    /**
     * Creates an array of elements split into groups the length of size.
     * If array can't be split evenly, the final chunk will be the remaining elements.
     *
     * @category Array
     * @param  {Array}    array      The array to proccess.
     * @param  {Integer}  [size=1]   The length of each chunk.
     * @return {Array}               Returns the new array of chunks.
     * @example
     *     chunk(['a', 'b', 'c', 'd'], 2)
     *     // => [['a', 'b'], ['c', 'd']]
     *
     *     chunk(['a', 'b', 'c', 'd'], 3)
     *     // => [['a', 'b', 'c'], ['d']]
     */
    chunk(array, size) {
        size = Math.max(size, 0);
        const length = array === null ? 0 : array.length;

        if ( ! length || size < 1 ) {
            return [];
        }

        let index = 0;
        let resIndex = 0;
        const result = new Array(Math.ceil(length / size));

        while ( index < length ) {
            result[resIndex++] = this.slice(array, index, (index += size));
        }

        return result;
    },

    /**
     * Removes empty index from a array.
     *
     * @category Array
     * @param {Array} arr - The array
     * @return {Array}
     */
    cleanArray(array) {
        let newArray = [];

        for ( let i = 0, len = array.length; i < len; i += 1 ) {
            if ( array[i] ) {
                newArray.push(array[i]);
            }
        }

        return newArray;
    },

    /**
     * Join array elements with glue string - PHP implode alike
     *
     * @category Array
     * @param {object|array} pieces - The array|object to implode.  If object it will implode the values, not the keys.
     * @param {string} [glue=','] - The glue
     * @return {string} The imploded array|object
     * @example
     *     implode(['Foo', 'Bar']); // 'Foo,Bar'
     */
    implode(pieces, glue) {
        if ( validateHelpers.isArray(pieces) ) {
            return pieces.join(glue || ',');
        } else if ( validateHelpers.isObject(pieces) ) {
            let arr = [];
            for ( let o in pieces ) {
                if ( object.hasOwnProperty(o) ) {
                    arr.push(pieces[o]);
                }
            }

            return arr.join(glue || ',');
        }

        return '';
    },

    /**
     * Randomize a array elements with Fisher–Yates shuffle algorithm base.
     *
     * @category Array
     * @param {array} array - The array to randomize
     * @return {array} The new modified array
     * @example
     *     const arr = [1, 2, 3, 4];
     *     shuffleArray(arr); // [3, 2, 4, 1]
     */
    shuffleArray(array) {
        let j = 0;
        let temp = [];
        let newArray = [];

        for ( let i = array.length - 1; i > 0; i-- ) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];

            newArray[i] = array[j];
            newArray[j] = temp;
        }

        return newArray;
    },

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are returned.
     *
     * @from Lodash
     *
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
     * @param {number} [end=array.length] The end position. A negative index will be treated as an offset from the end.
     * @returns {Array} Returns the slice of `array`.
     */
    slice(array, start, end) {
        let length = array == null ? 0 : array.length;

        if ( ! length ) {
            return [];
        }
        start = start == null ? 0 : start;
        end = end === undefined ? length : end;

        if ( start < 0 ) {
            start = -start > length ? 0 : (length + start);
        }

        end = end > length ? length : end;

        if ( end < 0 ) {
            end += length;
        }

        length = start > end ? 0 : ((end - start) >>> 0);
        start >>>= 0;

        let index = -1;
        const result = new Array(length);

        while ( ++index < length ) {
            result[index] = array[index + start];
        }

        return result;
    },
};
