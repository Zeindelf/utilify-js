
const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const Utilify = require('./../dist/utilify.common.js');
const utilify = new Utilify();
const globalHelpers = utilify.globalHelpers;

describe('Number Methods', () => {
    const numberToFormatK = 1000;
    const numberToFormatM = 1000000;
    const numberToFormatB = 1000000000;
    const numberToFormatT = 1000000000000;
    const numberToFormatP = 1000000000000000;
    const numberToFormatE = 1000000000000000000;
    const convertNumber = '123.123';

    const numberFormatK = globalHelpers.formatNumber(numberToFormatK);
    const numberFormatM = globalHelpers.formatNumber(numberToFormatM);
    const numberFormatB = globalHelpers.formatNumber(numberToFormatB);
    const numberFormatT = globalHelpers.formatNumber(numberToFormatT);
    const numberFormatP = globalHelpers.formatNumber(numberToFormatP);
    const numberFormatE = globalHelpers.formatNumber(numberToFormatE);

    const numberMilifyK = globalHelpers.milify(numberToFormatK);
    const numberMilifyM = globalHelpers.milify(numberToFormatM);
    const numberMilifyB = globalHelpers.milify(numberToFormatB);
    const numberMilifyT = globalHelpers.milify(numberToFormatT);
    const numberMilifyP = globalHelpers.milify(numberToFormatP);
    const numberMilifyE = globalHelpers.milify(numberToFormatE);

    const toNumber = globalHelpers.toNumber(convertNumber);

    it('number format', (done) => {
        expect(numberFormatK).to.equal('1.000');
        expect(numberFormatM).to.equal('1.000.000');
        expect(numberFormatB).to.equal('1.000.000.000');
        expect(numberFormatT).to.equal('1.000.000.000.000');
        expect(numberFormatP).to.equal('1.000.000.000.000.000');
        expect(numberFormatE).to.equal('1.000.000.000.000.000.000');
        done();
    });

    it('number milify', (done) => {
        expect(numberMilifyK).to.equal('1K');
        expect(numberMilifyM).to.equal('1M');
        expect(numberMilifyB).to.equal('1B');
        expect(numberMilifyT).to.equal('1T');
        expect(numberMilifyP).to.equal('1P');
        expect(numberMilifyE).to.equal('1E');
        done();
    });

    it('convert to number', (done) => {
        expect(toNumber).to.equal(123.123);
        done();
    });
});
