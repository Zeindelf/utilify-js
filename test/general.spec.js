
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const Utilify = require('./../dist/utilify.common.js');
const utilify = new Utilify();
const globalHelpers = utilify.globalHelpers;

describe('General Methods', () => {
    const urlToStrip = 'https://zeindelf.com/foo/bar';
    const emailToPassTest = 'zeindelf@hotmail.com';
    const emailToNotPassTest = 'zeindelf@hotmail';
    const queryStringUrl = 'http://www.site.com?param1=foo&param2=bar&param3=baz';
    const convertNumber = '123.123';

    const getType = (variable) => globalHelpers.getType(variable);
    const stripHost = globalHelpers.stripHost(urlToStrip);
    const stripHttp = globalHelpers.stripHttp(urlToStrip);
    const isEmail = globalHelpers.isEmail(emailToPassTest);
    const isNotEmail = globalHelpers.isEmail(emailToNotPassTest);
    const getUrlParameter1 = globalHelpers.getUrlParameter('param1', queryStringUrl);
    const getUrlParameter2 = globalHelpers.getUrlParameter('param2', queryStringUrl);
    const unserialize = globalHelpers.unserialize(queryStringUrl);
    const toNumber = globalHelpers.toNumber(convertNumber);

    it('get variable type', (done) => {
        const _undefined = undefined;
        const _number = 123;
        const _boolean = true;
        const _string = 'Foo';
        const _function = () => {};
        const _regExp = /[0-9]/g;
        const _array = [];
        const _date = new Date();
        const _error = new Error();

        expect(getType(_undefined)).to.equal('undefined');
        expect(getType(_number)).to.equal('number');
        expect(getType(_boolean)).to.equal('boolean');
        expect(getType(_string)).to.equal('string');
        expect(getType(_function)).to.equal('function');
        expect(getType(_regExp)).to.equal('regexp');
        expect(getType(_array)).to.equal('array');
        expect(getType(_date)).to.equal('date');
        expect(getType(_error)).to.equal('error');
        done();
    });

    it('url strip host', (done) => {
        expect(stripHost).to.equal('/foo/bar');
        done();
    });

    it('url strip http', (done) => {
        expect(stripHttp).to.equal('//zeindelf.com/foo/bar');
        done();
    });

    it('query string param', (done) => {
        expect(getUrlParameter1).to.equal('foo');
        expect(getUrlParameter2).to.equal('bar');
        done();
    });

    it('unserialize query string', (done) => {
        expect(unserialize).to.deep.equal({param1: 'foo', param2: 'bar', param3: 'baz'});
        done();
    });

    it('convert to number', (done) => {
        expect(toNumber).to.equal(123.123);
        done();
    });
});
