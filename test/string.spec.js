
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const Utilify = require('./../dist/utilify.common.js');
const utilify = new Utilify();
const globalHelpers = utilify.globalHelpers;

describe('String Methods', () => {
    const strToCapitalize = 'foo for bar to baz';
    const strToNormalize = 'Lorem Ipsum Dolor Sit Amet. Consectetur adipiscing elit?Cras Eu Mi Egestas, Malesuada Leo Eu! luctus urna.Duis Accumsan Iaculis.';
    const strToCompact = '  Foo  Bar    Baz   ';
    const strToRemoveAccents = 'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ';
    const strToSlugifyText = 'fòÖ fôö bâr bàz';
    const strToReplace = 'Foo to bar into baz foo';
    const strToRemoveSpaces = '  Foo  ';
    const strToUnderscore = 'Foo bar-baz Foo Bar-baz';

    const capitalize = globalHelpers.capitalize(strToCapitalize);
    const normalizeText = globalHelpers.normalizeText(strToNormalize);
    const pad = globalHelpers.pad(1);
    const padTwo = globalHelpers.pad(10, 3);
    const strCompact = globalHelpers.strCompact(strToCompact);
    const strRemoveAccents = globalHelpers.removeAccent(strToRemoveAccents);
    const strSlugifyText = globalHelpers.slugifyText(strToSlugifyText);
    const strReplace = globalHelpers.strReplace(['foo', 'bar'], ['replaced_foo', 'replaced_bar'], strToReplace);
    const trim = globalHelpers.trim(strToRemoveSpaces);
    const underscore = globalHelpers.underscore(strToUnderscore);

    it('string capitalize', (done) => {
        expect(capitalize).to.equal('Foo For Bar To Baz');
        done();
    });

    it('string normalize text', (done) => {
        expect(normalizeText).to.equal('Lorem ipsum dolor sit amet. Consectetur adipiscing elit? Cras eu mi egestas, malesuada leo eu! Luctus urna. Duis accumsan iaculis.');
        done();
    });

    it('string pad', (done) => {
        expect(pad).to.equal('01');
        expect(padTwo).to.equal('010');
        done();
    });

    it('string remove accents', (done) => {
        expect(strRemoveAccents).to.equal('aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
        done();
    });

    it('string slugify text', (done) => {
        expect(strSlugifyText).to.equal('foo-foo-bar-baz');
        done();
    });

    it('string compact', (done) => {
        expect(strCompact).to.equal('Foo Bar Baz');
        done();
    });

    it('string replace', (done) => {
        expect(strReplace).to.equal('Foo to replaced_bar into baz replaced_foo');
        done();
    });

    it('string trim', (done) => {
        expect(trim).to.equal('Foo');
        done();
    });

    it('string underscore', (done) => {
        expect(underscore).to.equal('foo_bar_baz_foo_bar_baz');
        done();
    });
});
