
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const Utilify = require('./../dist/utilify.common.js');
const utilify = new Utilify();
const globalHelpers = utilify.globalHelpers;

describe('String Methods', () => {
    const strToCapitalize = 'foo for bar to baz';
    const strToRemoveAccents = 'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ';
    const strToSlugifyText = 'fòÖ fôö bâr bàz';
    const strToReplace = 'Foo to bar into baz foo';
    const strToRemoveSpaces = '  Foo  ';

    const strCapitalize = globalHelpers.capitalize(strToCapitalize);
    const strRemoveAccents = globalHelpers.removeAccent(strToRemoveAccents);
    const strSlugifyText = globalHelpers.slugifyText(strToSlugifyText);
    const strReplace = globalHelpers.strReplace(['foo', 'bar'], ['replaced_foo', 'replaced_bar'], strToReplace);
    const trim = globalHelpers.trim(strToRemoveSpaces);

    it('string capitalize', (done) => {
        expect(strCapitalize).to.equal('Foo For Bar To Baz');
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

    it('string replace', (done) => {
        expect(strReplace).to.equal('Foo to replaced_bar into baz replaced_foo');
        done();
    });

    it('string trim', (done) => {
        expect(trim).to.equal('Foo');
        done();
    });
});
