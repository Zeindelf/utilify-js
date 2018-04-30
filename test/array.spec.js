
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const Utilify = require('./../dist/utilify.common.js');
const utilify = new Utilify();
const globalHelpers = utilify.globalHelpers;

describe('Array Methods', () => {
    const arrayToCompact = [null, 'a', undefined, 0, false, 'b', 'c', '', true];
    const arrToIntersection = [1, 2, 3];
    const arrToUnique = [1, 2, 2, 3, 4, 4, 4, 5];
    const arrToClean = [1, 2, , 3, , 4];
    const arrToShuffle = [1, 2, 3, 4, 5];
    const arrToImplode = ['Foo', 'Bar', 'Baz'];
    const arrToCount = [1, 2, 3, 4, 5, 6, 7];

    const compact = globalHelpers.arrayCompact(arrayToCompact);
    const intersection = globalHelpers.arrayIntersection(arrToIntersection, [2, 3, 4]);
    const unique = globalHelpers.arrayUnique(arrToUnique);
    const cleanArray = globalHelpers.cleanArray(arrToClean);
    const shuffle = globalHelpers.shuffleArray(arrToShuffle);
    const implode = globalHelpers.implode(arrToImplode);
    const arrLength = globalHelpers.length(arrToCount);

    it('array compact', (done) => {
        expect(compact).to.deep.equal(['a', 'b', 'c', true]);
        done();
    });

    it('array intersection', (done) => {
        expect(intersection).to.deep.equal([2, 3]);
        done();
    });

    it('array unique', (done) => {
        expect(unique).to.deep.equal([1, 2, 3, 4, 5]);
        done();
    });

    it('clean array', (done) => {
        expect(cleanArray).to.deep.equal([1, 2, 3, 4]);
        done();
    });

    it('array shuffle', (done) => {
        expect(shuffle).to.not.deep.equal(arrToShuffle);
        done();
    });

    it('implode array', (done) => {
        expect(globalHelpers.implode(arrToImplode)).to.equal('Foo,Bar,Baz');
        expect(globalHelpers.implode(arrToImplode, ' - ')).to.equal('Foo - Bar - Baz');
        done();
    });

    it('array length', (done) => {
        expect(arrLength).to.equal(7);
        done();
    });
});
