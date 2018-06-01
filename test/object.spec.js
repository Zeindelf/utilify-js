
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const Utilify = require('./../dist/utilify.common.js');
const utilify = new Utilify();
const globalHelpers = utilify.globalHelpers;

describe('Object Methods', () => {
    const objToCount = {foo: 'Foo', bar: 'Bar', baz: 'Baz'};
    const objToExtendOne = {foo1: 'Foo 1', bar1: 'Bar 1'};
    const objToExtendTwo = {foo2: 'Foo 2', bar2: 'Bar 2'};
    const objToGetProp = {foo: {bar: {baz: 'Baz'}}};
    const objToSearch = [{
        id: 0,
        name: 'key 0',
        children: [{
            id: 1,
            name: 'key 1',
            children: [{
                id: 2,
                name: 'key 2',
                item: [{
                    id: 3,
                    name: 'key 3'
                }],
                item: [{
                    id: 4,
                    name: 'key 4'
                }],
            }],
        }],
    }];

    const objLength = globalHelpers.length(objToCount);
    const objExtend = globalHelpers.extend({}, objToExtendOne, objToExtendTwo);
    const objValidateSuccess = globalHelpers.isObject({foo: 'Foo'});
    const objValidateError = globalHelpers.isObject('Foo');
    const objEmpty = globalHelpers.isObjectEmpty({});
    const objGetDescendantProp = globalHelpers.getDescendantProp(objToGetProp, 'foo.bar.baz');
    const objectSearch = globalHelpers.objectSearch(objToSearch, {id: 4});

    it('object length', (done) => {
        expect(objLength).to.equal(3);
        done();
    });

    it('object extend', (done) => {
        expect(objExtend).to.deep.equal({foo1: 'Foo 1', bar1: 'Bar 1', foo2: 'Foo 2', bar2: 'Bar 2'});
        done();
    });

    it('object validate', (done) => {
        expect(objValidateSuccess).to.equal(true);
        expect(objValidateError).to.equal(false);
        done();
    });

    it('object empty', (done) => {
        expect(objEmpty).to.equal(true);
        done();
    });

    it('object search', (done) => {
        expect(objectSearch).to.deep.equal({id: 4, name: 'key 4'});
        done();
    });

    it('get descendant properties', (done) => {
        expect(objGetDescendantProp).to.equal('Baz');
        done();
    });

    const objToSortByValue = [{param: 'D'}, {param: 'A'}, {param: 'E'}, {param: 'C'}, {param: 'B'}];
    const objToSortByValueDeep = [{deep: {param: 'D'}}, {deep: {param: 'A'}}, {deep: {param: 'E'}}, {deep: {param: 'C'}}, {deep: {param: 'B'}}];
    const mapToSort = ['A', 'B', 'C', 'D', 'E'];

    const objectArraySortByValueAsc = globalHelpers.objectArraySortByValue(objToSortByValue, mapToSort, 'param');
    const objectArraySortByValueDesc = globalHelpers.objectArraySortByValue(objToSortByValue, mapToSort, 'param', true);
    const objectArraySortByValueDeepAsc = globalHelpers.objectArraySortByValue(objToSortByValueDeep, mapToSort, 'deep.param');
    const objectArraySortByValueDeepDesc = globalHelpers.objectArraySortByValue(objToSortByValueDeep, mapToSort, 'deep.param', true);

    const objectArraySortByValueEmptyMapAsc = globalHelpers.objectArraySortByValue(objToSortByValue, [], 'param');
    const objectArraySortByValueEmptyMapDesc = globalHelpers.objectArraySortByValue(objToSortByValue, '', 'param', true);
    const objectArraySortByValueDeepEmptyMapAsc = globalHelpers.objectArraySortByValue(objToSortByValueDeep, [], 'deep.param');
    const objectArraySortByValueDeepEmptyMapDesc = globalHelpers.objectArraySortByValue(objToSortByValueDeep, '', 'deep.param', true);

    it('object array sort by value', (done) => {
        const expectedObjToSortByValueAsc = [{param: 'A'}, {param: 'B'}, {param: 'C'}, {param: 'D'}, {param: 'E'}];
        const expectedObjToSortByValueDesc = [{param: 'E'}, {param: 'D'}, {param: 'C'}, {param: 'B'}, {param: 'A'}];
        const expectedObjToSortByValueDeepAsc = [{deep: {param: 'A'}}, {deep: {param: 'B'}}, {deep: {param: 'C'}}, {deep: {param: 'D'}}, {deep: {param: 'E'}}];
        const expectedObjToSortByValueDeepDesc = [{deep: {param: 'E'}}, {deep: {param: 'D'}}, {deep: {param: 'C'}}, {deep: {param: 'B'}}, {deep: {param: 'A'}}];

        expect(objectArraySortByValueAsc).to.deep.equal(expectedObjToSortByValueAsc);
        expect(objectArraySortByValueDesc).to.deep.equal(expectedObjToSortByValueDesc);
        expect(objectArraySortByValueDeepAsc).to.deep.equal(expectedObjToSortByValueDeepAsc);
        expect(objectArraySortByValueDeepDesc).to.deep.equal(expectedObjToSortByValueDeepDesc);

        expect(objectArraySortByValueEmptyMapAsc).to.deep.equal(expectedObjToSortByValueAsc);
        expect(objectArraySortByValueEmptyMapDesc).to.deep.equal(expectedObjToSortByValueDesc);
        expect(objectArraySortByValueDeepEmptyMapAsc).to.deep.equal(expectedObjToSortByValueDeepAsc);
        expect(objectArraySortByValueDeepEmptyMapDesc).to.deep.equal(expectedObjToSortByValueDeepDesc);
        done();
    });
});
