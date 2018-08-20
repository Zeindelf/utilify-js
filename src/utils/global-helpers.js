
import validateHelpers from './validate-helpers.js';
import stringHelpers from './string-helpers.js';

export default {
    /**
     * Recursively transform key strings to camelCase if param is an Object.
     * If param is string, return an camel cased string.
     *
     * @param  {Object|String} obj  Object or string to transform
     * @returns {Object|String}
     */
    camelize(obj) {
        const _camelize = (str) => {
            str = stringHelpers.underscore(str);
            str = stringHelpers.slugifyText(str);

            return str.replace(/[_.-\s](\w|$)/g, (_, x) => x.toUpperCase());
        };

        if ( validateHelpers.isDate(obj) || validateHelpers.isRegExp(obj) ) {
            return obj;
        }

        if ( validateHelpers.isArray(obj) ) {
            return obj.map((item, index) => {
                if ( validateHelpers.isObject(item) ) {
                    return this.camelize(item);
                }

                return item;
            });
        }

        if ( validateHelpers.isString(obj) ) {
            return _camelize(obj);
        }

        return Object.keys(obj).reduce((acc, key) => {
            const camel = _camelize(key);
            acc[camel] = obj[key];

            if ( validateHelpers.isObject(obj[key]) ) {
                acc[camel] = this.camelize(obj[key]);
            }

            return acc;
        }, {});
    },

    /**
     * Check if value contains in an element
     *
     * @category Global
     * @param {String} value - Value to check
     * @param {String|Array} elem - String or array
     * @return {Boolean} - Return true if element contains a value
     */
    contains(value, elem) {
        if ( validateHelpers.isArray(elem) ) {
            for ( let i = 0, len = elem.length; i < len; i += 1 ) {
                if ( elem[i] === value ) {
                    return true;
                }
            }
        }

        if ( validateHelpers.isString(elem) ) {
            return elem.indexOf(value) >= 0;
        }

        return false;
    },

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked, or until the next browser frame is drawn. The debounced function
     * comes with a `cancel` method to cancel delayed `func` invocations and a
     * `flush` method to immediately invoke them. Provide `options` to indicate
     * whether `func` should be invoked on the leading and/or trailing edge of the
     * `wait` timeout. The `func` is invoked with the last arguments provided to the
     * debounced function. Subsequent calls to the debounced function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
     * invocation will be deferred until the next frame is drawn (typically about
     * 16ms).
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `debounce` and `throttle`.
     *
     * @from Lodash
     *
     * @category Global
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay; if omitted, `requestAnimationFrame` is used (if available).
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false] Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing edge of the timeout.
     * @return {Function} Returns the new debounced function.
     * @example
     *     // Avoid costly calculations while the window size is in flux.
     *     $(window).on('resize', debounce(calculateLayout, 150));
     *
     *     // Invoke `sendMail` when clicked, debouncing subsequent calls.
     *     $(element).on('click', debounce(sendMail, 300, {
     *        'leading': true,
     *         'trailing': false,
     *     }));
     *
     *     // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     *     const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
     *     const source = new EventSource('/stream')
     *     $(source).on('message', debounced)
     *
     *     // Cancel the trailing debounced invocation.
     *     $(window).on('popstate', debounced.cancel)
     *
     *     // Check for pending invocations.
     *     const status = debounced.pending() ? "Pending..." : "Ready"
     */
    debounce(func, wait, options) {
        let lastArgs;
        let lastThis;
        let maxWait;
        let result;
        let timerId;
        let lastCallTime;

        let lastInvokeTime = 0;
        let leading = false;
        let maxing = false;
        let trailing = true;

        // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
        const useRAF = ( ! wait && wait !== 0 && typeof window.requestAnimationFrame === 'function' );

        if ( typeof func != 'function' ) {
            throw new TypeError('Expected a function');
        }

        wait = +wait || 0;
        if ( validateHelpers.isObject(options) ) {
            leading = !! options.leading;
            maxing = 'maxWait' in options;
            maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
        }

        function invokeFunc(time) {
            const args = lastArgs;
            const thisArg = lastThis;

            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
        }

        function startTimer(pendingFunc, wait) {
            if ( useRAF ) {
                return window.requestAnimationFrame(pendingFunc);
            }

            return setTimeout(pendingFunc, wait);
        }

        function cancelTimer(id) {
            if ( useRAF ) {
                return window.cancelAnimationFrame(id);
            }

            clearTimeout(id);
        }

        function leadingEdge(time) {
            // Reset any `maxWait` timer.
            lastInvokeTime = time;
            // Start the timer for the trailing edge.
            timerId = startTimer(timerExpired, wait);
            // Invoke the leading edge.
            return leading ? invokeFunc(time) : result;
        }

        function remainingWait(time) {
            const timeSinceLastCall = time - lastCallTime;
            const timeSinceLastInvoke = time - lastInvokeTime;
            const timeWaiting = wait - timeSinceLastCall;

            return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }

        function shouldInvoke(time) {
            const timeSinceLastCall = time - lastCallTime;
            const timeSinceLastInvoke = time - lastInvokeTime;

            // Either this is the first call, activity has stopped and we're at the
            // trailing edge, the system time has gone backwards and we're treating
            // it as the trailing edge, or we've hit the `maxWait` limit.
            return ( lastCallTime === undefined || ( timeSinceLastCall >= wait ) || ( timeSinceLastCall < 0 ) || ( maxing && timeSinceLastInvoke >= maxWait ) );
        }

        function timerExpired() {
            const time = Date.now();
            if ( shouldInvoke(time) ) {
                return trailingEdge(time);
            }

            // Restart the timer.
            timerId = startTimer(timerExpired, remainingWait(time));
        }

        function trailingEdge(time) {
            timerId = undefined;

            // Only invoke if we have `lastArgs` which means `func` has been
            // debounced at least once.
            if ( trailing && lastArgs ) {
                return invokeFunc(time);
            }

            lastArgs = lastThis = undefined;
            return result;
        }

        function cancel() {
            if ( timerId !== undefined ) {
                cancelTimer(timerId);
            }

            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined;
        }

        function flush() {
            return ( timerId === undefined ) ? result : trailingEdge(Date.now());
        }

        function pending() {
            return timerId !== undefined;
        }

        function debounced(...args) {
            const time = Date.now();
            const isInvoking = shouldInvoke(time);

            lastArgs = args;
            /* eslint-disable */
            lastThis = this;
            /* eslint-enable */
            lastCallTime = time;

            if ( isInvoking ) {
                if ( timerId === undefined ) {
                    return leadingEdge(lastCallTime);
                }

                if ( maxing ) {
                    // Handle invocations in a tight loop.
                    timerId = startTimer(timerExpired, wait);
                    return invokeFunc(lastCallTime);
                }
            }

            if ( timerId === undefined ) {
                timerId = startTimer(timerExpired, wait);
            }

            return result;
        }

        debounced.cancel = cancel;
        debounced.flush = flush;
        debounced.pending = pending;
        return debounced;
    },

    /**
     * Get variable type
     *
     * @category Global
     * @param {Mix} variable - Variable to check type
     * @return {string} Name of variable type
     * @example
     *     getType(123); // 'number'
     *     getType([]); // 'array'
     *     getType({}); // 'object'
     *     // and so on...
     */
    getType(variable) {
        const types = {
            'undefined': 'undefined',
            'number': 'number',
            'boolean': 'boolean',
            'string': 'string',
            '[object Function]': 'function',
            '[object RegExp]': 'regexp',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object Error]': 'error',
        };

        return types[typeof variable] || types[({}).toString.call(variable)] || (variable ? 'object' : 'null');
    },

    /**
     * Get url params from a query string
     *
     * @category Global
     * @param {string} name - Param name
     * @param {string} entryPoint - Full url or query string
     * @return {string} Value query string param
     * @example
     *     // URL: https://site.com?param1=foo&param2=bar
     *     getUrlParameter('param1'); // foo
     *     getUrlParameter('param2'); // bar
     *
     *     // Given entry point
     *     var url = 'http://www.site.com?param1=foo&param2=bar&param3=baz';
     *     getUrlParameter('param3', url); // baz
     */
    getUrlParameter(name, entryPoint) {
        entryPoint = ! validateHelpers.isString(entryPoint) ? window.location.href :
            ( entryPoint.substring(0, 1) === '?' ) ? entryPoint : `?${entryPoint}`;
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(entryPoint);

        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },

    /**
     * Resize image by aspect ratio
     *
     * @category Global
     * @param  {String} type          Resize by 'width' or 'height'
     * @param  {Number} newSize       New value to resize
     * @param  {Number} aspectRatio   Image aspect ratio (calculate by (width / height))
     * @return {Object}               Object with new 'width' and 'height'
     */
    resizeImageByRatio(type, newSize, aspectRatio, decimal) {
        if ( !validateHelpers.isNumber(newSize) || !validateHelpers.isNumber(aspectRatio) ) {
            newSize = parseFloat(newSize, 10);
            aspectRatio = parseFloat(aspectRatio, 10);
        }

        const dimensions = {};
        decimal = decimal || 4;

        switch ( type ) {
            case 'width':
                dimensions.width = parseFloat(newSize, 10);
                dimensions.height = parseFloat((newSize / aspectRatio).toFixed(decimal), 10);

                break;

            case 'height':
                dimensions.width = parseFloat((newSize * aspectRatio).toFixed(decimal), 10);
                dimensions.height = parseFloat(newSize, 10);

                break;

            default:
                throw new Error(`'type' needs to be 'width' or 'height'`);
        }

        return dimensions;
    },

    /**
     * Compare two semver version strings, returning -1, 0, or 1
     * If the semver string `v1` is greater than `v2`, return 1. If the semver string `v2` is greater than `v1`, return -1. If `v1` equals `v2`, return 0
     *
     * @from @semver-compare
     * @category Global
     * @param  {String} v1 Your semver to compare
     * @param  {String} v2 Compared semver
     * @return {Number}    -1, 0, 1
     */
    semverCompare(v1, v2) {
        const semver = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
        const validate = (version) => {
            if ( !validateHelpers.isString(version) ) {
                throw new TypeError('Invalid argument: expected string');
            }
            if ( !semver.test(version) ) {
                throw new Error('Invalid argument: not valid semver');
            }
        };

        [v1, v2].forEach(validate);

        const pa = v1.split('.');
        const pb = v2.split('.');

        for ( let i = 0; i < 3; i++ ) {
            const na = Number(pa[i]);
            const nb = Number(pb[i]);

            if ( na > nb ) {
                return 1;
            }

            if ( nb > na ) {
                return -1;
            }

            if ( !isNaN(na) && isNaN(nb) ) {
                return 1;
            }

            if ( isNaN(na) && !isNaN(nb) ) {
                return -1;
            }
        }

        return 0;
    },

    /**
     * Removes the host from an url
     *
     * @category Global
     * @param {string} url - The url
     * @return {string} The modified string
     * @example
     *     stripHost("http://test.com.br/contact/test"); //  "/contact/test"
     */
    stripHost(url) {
        let newUrl = url;
        return newUrl.toString().replace(/https?:\/\/.*?\//i, '/');
    },

    /**
     * Removes the protocol from an url
     *
     * @category Global
     * @param {string} url - The url
     * @return {string} The modified string
     * @example
     *     stripHttp('http://test.com.br/contact/test'); // '//test.com.br/contact/test'
     */
    stripHttp(url) {
        let newUrl = url;
        return newUrl.replace(/^https?:/, '');
    },

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds (or once per browser frame). The throttled function
     * comes with a `cancel` method to cancel delayed `func` invocations and a
     * `flush` method to immediately invoke them. Provide `options` to indicate
     * whether `func` should be invoked on the leading and/or trailing edge of the
     * `wait` timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
     * invocation will be deferred until the next frame is drawn (typically about
     * 16ms).
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `throttle` and `debounce`.
     *
     * @from Lodash
     * @category Global
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to; if omitted, `requestAnimationFrame` is used (if available).
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true] Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing edge of the timeout.
     * @return {Function} Returns the new throttled function.
     * @example
     *     // Avoid excessively updating the position while scrolling.
     *     $(window).on('scroll', throttle(updatePosition, 100))
     *
     *     // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     *     const throttled = throttle(renewToken, (1000 * 60 * 5), {'trailing': false})
     *     $(element).on('click', throttled)
     *
     *     // Cancel the trailing throttled invocation.
     *     $(window).on('popstate', throttled.cancel)
     */
    throttle(func, wait, options) {
        let leading = true;
        let trailing = true;

        if ( typeof func !== 'function' ) {
            throw new TypeError('Expected a function');
        }

        if ( validateHelpers.isObject(options) ) {
            leading = ( 'leading' in options ) ? !! options.leading : leading;
            trailing = ( 'trailing' in options ) ? !! options.trailing : trailing;
        }

        return this.debounce(func, wait, {
            'leading': leading,
            'maxWait': wait,
            'trailing': trailing,
        });
    },

    /**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argumentindex).
     *
     * @from Lodash
     * @category Global
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *     times(3, String)
     *     // => ['0', '1', '2']
     *
     *     times(4, () => 0)
     *     // => [0, 0, 0, 0]
     */
    times(n, iteratee) {
        /** Used as references for various `Number` constants. */
        const MAX_SAFE_INTEGER = 9007199254740991;
        /** Used as references for the maximum length and index of an array. */
        const MAX_ARRAY_LENGTH = 4294967295;

        if ( n < 1 || n > MAX_SAFE_INTEGER ) {
            return [];
        }

        let index = -1;
        const length = Math.min(n, MAX_ARRAY_LENGTH);
        const result = new Array(length);

        while ( ++index < length ) {
            result[index] = iteratee(index);
        }

        index = MAX_ARRAY_LENGTH;
        n -= MAX_ARRAY_LENGTH;

        while ( ++index < n ) {
            iteratee(index);
        }

        return result;
    },

    /**
     * Unserialize a query string into an object.
     *
     * @category Global
     * @param {string} [str = actual url] - The string that will be converted into a object
     * @return {object}
     * @example
     *     // str can be '?param1=foo&param2=bar&param3=baz', 'param1=foo&param2=bar&param3=baz' or a full url
     *     // If no provided, will get actual url
     *     var url = 'http://www.site.com?param1=foo&param2=bar&param3=baz';
     *     unserialize(url); // {param1: 'foo', param2: 'bar', param3: 'baz'}
     */
    unserialize(str) {
        str = ! validateHelpers.isString(str) ? window.location.href : str;

        if ( str.indexOf('?') < 0 ) {
            return {};
        }

        str = ( str.indexOf('?') === 0 ) ? str.substr(1) : str.slice(str.indexOf('?') + 1);

        let query = {};
        let parts = str.split('&');

        for ( let i = 0, len = parts.length; i < len; i += 1 ) {
            let part = parts[i].split('=');
            query[decodeURIComponent(part[0])] = decodeURIComponent(part[1] || '');
        }

        return query;
    },
};
