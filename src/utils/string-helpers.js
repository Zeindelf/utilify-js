
import validateHelpers from './validate-helpers.js';

export default {
    /**
     * Capitalize a string
     *
     * @param {string} str - The String
     * @return {string} The modified string
     * @example
     *     capitalize('foo bar'); // 'Foo Bar'
     */
    capitalize(str) {
        return str.replace(/(?:^|\s)\S/g, (match) => {
            return match.toUpperCase();
        });
    },

    /**
     * Replace <, >, &, ', " and / with HTML entities.
     * @param {string} str - The string to check
     * @return {boolean}
     */
    escape(str) {
        return (str.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\//g, '&#x2F;')
            .replace(/\\/g, '&#x5C;')
            .replace(/`/g, '&#96;'));
    },

    /**
     * Normalize text adding first character to upper after punctuations (. ? !)
     *
     * @param  {String} [str]  Text to convert
     * @return {String}
     */
    normalizeText(str) {
        const re = /(^|[.!?]\s+)([a-z])/g;

        const normalize = (str) => str.toLowerCase().replace(re, (m, $1, $2) => $1 + $2.toUpperCase());
        const addSpace = (str) => strCompact(str.replace(/[,.!?:;]+(?=\S)/g, '$& '));

        return normalize(addSpace(this.strCompact(str)));
    },

    /**
     * Zero padding number
     *
     * @param  {integer} number     Number to format
     * @param  {integer} [size=2]   Digits limit
     * @return {string}             Formatted num with zero padding
     */
    pad(number, size) {
        let stringNum = String(number);

        while (stringNum.length < (size || 2)) {
            stringNum = '0' + stringNum;
        }

        return stringNum;
    },

    /**
     * Remove accents from a string
     * @param {string} str - The string to remove accents
     * @return {string} The modified string
     * @example
     *     removeAccent('Olá Mündô!'); // 'Ola Mundo!'
     */
    removeAccent(str) {
        const reAccents = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;

        // Prefixed with some char to avoid off-by-one:
        const replacements = '_aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';

        return str.replace(reAccents, (match) => {
            return replacements[reAccents.source.indexOf(match)];
        });
    },

    /**
     * Slugify a text, removing/replacing all special characters and spaces with dashes '-'
     * @param {string} str - The string to sanitize
     * @return {string} The modified string
     * @example
     *     slugifyText('Olá Mundo!'); // 'ola-mundo'
     */
    slugifyText(str) {
        str = str.replace(/^\s+|\s+$/g, '') // trim
            .toLowerCase()
            .replace(/\./g, '-') // Replace a dot for a -
            .replace(/\*/g, '-') // Replace a * for a -
            .replace(/\+/g, '-'); // Replace a + for a -

        // Remove accents, swap ñ for n, etc
        const from = 'àáäâãèéëêìíïîòóöôõùúüûýÿñç·/_,:;';
        const to = 'aaaaaeeeeiiiiooooouuuuyync------';

        for ( let i = 0, len = from.length; i < len; i += 1 ) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
            .replace(/\s+/g, '-') // Collapse whitespace and replace by -
            .replace(/-+/g, '-'); // Collapse dashes

        if ( str.charAt(0) === '-') str = str.substr(1);
        if ( str.charAt(str.length - 1) === '-') str = str.substr(0, str.length - 1);

        return str;
    },

    /**
     * Compacts whitespace in the string to a single space and trims the ends.
     *
     * @param  {String} [str] String to remove spaces
     * @return {String}
     * @example
     *     strCompact('  Foo  Bar    Baz  ') // 'Foo Bar Baz'
     */
    strCompact(str) {
        return this.trim(str).replace(/([\r\n\s])+/g, (match, whitespace) => {
            return whitespace === '　' ? whitespace : ' ';
        });
    },

    /**
     * Multiple string replace, PHP str_replace clone
     * @param {string|Array} search - The value being searched for, otherwise known as the needle.
     *     An array may be used to designate multiple needles.
     * @param {string|Array} replace - The replacement value that replaces found search values.
     *     An array may be used to designate multiple replacements.
     * @param {string} subject - The subject of the replacement
     * @return {string} The modified string
     * @example
     *     strReplace(['olá', 'mundo'], ['hello', 'world'], 'olá mundo'); // 'hello world'
     *     strReplace(['um', 'dois'], 'olá', 'um dois três'); // Output 'olá olá três'
     */
    strReplace(search, replace, subject) {
        let regex;

        if ( validateHelpers.isArray(search) ) {
            for ( let i = 0; i < search.length; i++ ) {
                search[i] = search[i].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
                regex = new RegExp(search[i], 'g');
                subject = subject.replace(regex, (validateHelpers.isArray(replace) ? replace[i] : replace));
            }
        } else {
            search = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            regex = new RegExp(search, 'g');
            subject = subject.replace(regex, (validateHelpers.isArray(replace) ? replace[0] : replace));
        }

        return subject;
    },

    /**
     * Remove leading and trailing empty spaces.
     *
     * @param {String} str - The string.
     * @returns {String} The new string.
     * @example
     *     trim('  Foo  ') // 'Foo'
     */
    trim(str) {
        if ( validateHelpers.isString(str) ) {
            return str.replace(/^\s+|\s+$/gm, '');
        }

        return '';
    },

    /**
     * Make a string's first character uppercase
     * PHP ucfirst clone
     *
     * @param {String} str - The string.
     * @returns {String} The new string.
     * @example
     *     ucfirst('foo bar foz') // 'Foo bar foz'
     */
    ucfirst(str) {
        str += '';
        const f = str.charAt(0).toUpperCase();

        return f + str.substr(1);
    },

    /**
     * Converts hyphens and camel casing to underscores.
     *
     * @param  {String} str String to convert
     * @return {String}
     */
    underscore(str) {
        return str
            .replace(/[-\s]+/g, '_')
            .replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2')
            .replace(/([a-z\d])([A-Z])/g, '$1_$2')
            .toLowerCase();
    },

    /**
     * Replaces HTML encoded entities with <, >, &, ', " and /.
     * @param {string} str - The string to check
     * @return {boolean}
     */
    unescape(str) {
        return (str.replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, '\'')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#x2F;/g, '/')
            .replace(/&#x5C;/g, '\\')
            .replace(/&#96;/g, '`'));
    },
};
