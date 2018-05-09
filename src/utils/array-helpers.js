
import validateHelpers from './validate-helpers.js';

export default {
    /**
     * Creates a shallow clone of the array.
     *
     * @param  {Array} arr Array to clone
     * @return {Array}     Array cloned
     */
    arrayClone(arr) {
        let clone = new Array(arr.length);

        this._forEach(arr, (el, i) => {
            clone[i] = el;
        });

        return clone;
    },

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
     * Returns a flattened, one-dimensional copy of the array.
     * You can optionally specify a limit, which will only flatten to that depth.
     *
     * @param  {Array}   arr              Array to flatten
     * @param  {Integer} level[Infinity]  Depth
     * @return {Array}
     */
    arrayFlatten(arr, level) {
        const self = this;
        let result = [];
        let current = 0;
        level = level || Infinity;

        self._forEach(arr, (el) => {
            if ( validateHelpers.isArray(el) && current < level ) {
                result = result.concat(self.arrayFlatten(el, level, current + 1));
            } else {
                result.push(el);
            }
        });
        return result;
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
     * Returns a random element from the array.
     * If num is passed, will return an array of num elements.
     * If remove is true, sampled elements will also be removed from the array.
     * remove can also be passed in place of num.
     *
     * @param  {Array} [arr]  Array to sample
     * @param  {Integer|Boolean} [num=1]    Num of elements
     * @param  {Boolean} [remove=false]     Remove sampled elements
     * @return {String|Array}
     */
    arraySample(arr, num, remove) {
        let result = [];
        let _num;
        let _remove;
        let single;

        if ( validateHelpers.isBoolean(num) ) {
            _remove = num;
        } else {
            _num = num;
            _remove = remove;
        }

        if ( validateHelpers.isUndefined(_num) ) {
            _num = 1;
            single = true;
        }

        if ( !_remove ) {
            arr = this.arrayClone(arr);
        }

        _num = Math.min(_num, arr.length);

        for ( let i = 0, index; i < _num; i += 1 ) {
            index = Math.trunc(Math.random() * arr.length);
            result.push(arr[index]);
            arr.splice(index, 1);
        }

        return single ? result[0] : result;
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

    // PRIVATE
    _getSparseArrayIndexes(arr, fromIndex, loop, fromRight) {
        let indexes = [];
        let i;

        for ( i in arr ) {
            // Istanbul ignore next
            if ( validateHelpers.isArrayIndex(i) && (loop || (fromRight ? i <= fromIndex : i >= fromIndex)) ) {
                indexes.push(+i);
            }
        }

        indexes.sort((a, b) => {
            const aLoop = a > fromIndex;
            const bLoop = b > fromIndex;

            // This block cannot be reached unless ES5 methods are being shimmed.
            // istanbul ignore if
            if ( aLoop !== bLoop ) {
                return aLoop ? -1 : 1;
            }

            return a - b;
        });

        return indexes;
    },

    _iterateOverSparseArray(arr, fn, fromIndex, loop) {
        const indexes = this._getSparseArrayIndexes(arr, fromIndex, loop);
        let index;

        for ( let i = 0, len = indexes.length; i < len; i += 1 ) {
            index = indexes[i];
            fn.call(arr, arr[index], index, arr);
        }

        return arr;
    },

    _forEach(arr, fn) {
        for ( let i = 0, len = arr.length; i < len; i += 1 ) {
            if ( !(i in arr) ) {
                return this._iterateOverSparseArray(arr, fn, i);
            }

            fn(arr[i], i);
        }
    },
};
