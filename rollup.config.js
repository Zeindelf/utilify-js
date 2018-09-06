
const babel = require('rollup-plugin-babel');
const pkg = require('./package');

const now = new Date();
const banner = `
/*@preserve
 * Utilify.js v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2017-${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`;

module.exports = {
    // Export banner
    banner,
    input: 'src/utilify.js',
    output: [
        {
            banner: banner,
            file: 'dist/utilify.js',
            format: 'umd',
            name: 'UtilifyJS',
        },
        {
            banner: banner,
            file: 'dist/utilify.common.js',
            format: 'cjs',
        },
        {
            banner: banner,
            file: 'dist/utilify.esm.js',
            format: 'es',
        },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers'],
        }),
    ],
};
