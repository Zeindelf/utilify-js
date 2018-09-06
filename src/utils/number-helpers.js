
import validateHelpers from './validate-helpers.js';

export default {
    /**
     * Formats an integer number with dots/commas as thousands separators
     *
     * @param  {Integer} num Number to format
     * @param  {String} [separator='.'] Separator
     * @return {String}
     */
    formatNumber(num, separator) {
        separator = separator || '.';

        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    },

    /**
     * Convert long numbers into a human-readable format, e.g. 25000 to '25K'
     *
     * @from millify
     * @param  {Number} number    Number to format
     * @param  {Integer} [decimal=1]  Decimal places
     * @return {String}
     */
    milify(number, decimal) {
        const suffixes = new Map();
        suffixes.set(3, 'K');
        suffixes.set(6, 'M');
        suffixes.set(9, 'B');
        suffixes.set(12, 'T');
        suffixes.set(15, 'P');
        suffixes.set(18, 'E');

        // Make sure value is a number
        number = ((num) => {
            if ( !validateHelpers.isNumber(num) ) {
                throw new Error('Input value is not a number');
            }

            return parseFloat(num, 10);
        })(number);

        // Figure out how many digits in the integer
        const digits = Math.floor(Math.log10(Math.abs(number))) + 1;

        // Figure out the appropriate unit for the number
        const units = ((num, zeroes) => {
            for ( let z of suffixes.keys() ) {
                if ( num > z ) {
                    zeroes = z;
                }
            }

            return {
                suffix: suffixes.get(zeroes),
                zeroes,
            };
        })(digits, null);

        const pretty = number/Math.pow(10, units.zeroes);

        decimal = (pretty % 1 === 0) ? 2 : Math.max(1, (decimal + 1)) || 3;

        if ( -1000 < number && number < 1000) {
            return number;
        }

        return `${parseFloat(pretty.toPrecision(decimal))}${units.suffix}`;
    },

    /**
     * Converts a value to a number if possible.
     *
     * @category Global
     * @param {Mix} value The value to convert.
     * @returns {Number} The converted number, otherwise the original value.
     * @example
     *     toNumber('123') // 123
     *     toNumber('123.456') // 123.456
     */
    toNumber(value) {
        const number = parseFloat(value);
        if ( number === undefined ) {
            return value;
        }

        if ( number.toString().length !== value.toString().length ) {
            return value;
        }

        // if ( validateHelpers.isArray(value) ) {
        //     return this.toNumber(param.map((a) => num(a)));
        // }

        return Number.isNaN(number) ? value : number;
    },
};
