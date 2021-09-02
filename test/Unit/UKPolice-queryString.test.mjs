import 'assert';
import 'chai';
import { assert, expect } from 'chai';
import { UKPolice } from './../../src/UKPolice/UKPolice.mjs';

describe('UKPolice method queryString', function() {
    it('exists', function() {
        expect(new UKPolice()).to.respondTo('queryString');
    });

    describe('accepts', function() {
        beforeEach(function() {
            this.currentTest.value = new UKPolice().queryString;
        });

        it('array of keys', function() {
            expect(() => this.test.value()).to.throw('Missing Argument');

            let correct = [];
            let bad = {};

            expect(() => this.test.value(bad, [])).to.throw('Bad Argument');
            expect(() => this.test.value(correct)).to.throw('Missing Argument');
            expect(() => this.test.value(correct, [])).to.not.throw();
        });

        it('array of values', function() {
            let correct = [];
            let bad = {};

            expect(() => this.test.value([], bad)).to.throw('Bad Argument');
            expect(() => this.test.value([], correct)).to.not.throw();
        });
    });

    describe('returns string with', function() {
        beforeEach(function() {
            this.currentTest.value = new UKPolice().queryString;
        });

        it('location_id', function() {
            let keys = ['location', 'date'];
            let values = [123456, '2020-09-11'];

            expect(this.test.value(keys, values))
                .to.equal(`?location_id=123456&date=2020-09`);
        });

        it('category_id', function() {
            let keys = ['category', 'date'];
            let values = ['all-crime', '2020-09-11'];

            expect(this.test.value(keys, values))
                .to.equal(`?category=all-crime&date=2020-09`);
        });

        it('force_id', function() {
            let keys = ['force', 'date'];
            let values = ['lincolnshire', '2020-09-11'];

            expect(this.test.value(keys, values))
                .to.equal(`?force=lincolnshire&date=2020-09`);
        });

        it('correctly formatted query', function() {
            let keys = ['coords', 'date'];
            let values = [[5.555, 1.009], '2020-09-11'];

            expect(this.test.value(keys, values))
                .to.equal(`?lat=5.555&lng=1.009&date=2020-09`);
        });

        it('coordiantes', function() {
            let keys = ['coords', 'date'];
            let values = [[5.555, 1.009], '2020-09-11'];

            expect(this.test.value(keys, values))
                .to.include('lat', `Query stiring does not have all keys.`)
                .and.include('lng', `Query stiring does not have all keys.`);

            expect(this.test.value(keys, values))
                .to.include(values[0][0], `Query string is missing value.`)
                .and.include(values[0][1], `Query string is missing value.`);

        });

        it('polygon - under 3000 chars', function() {
            let key = ['poly'];
            let polygon = [[52.268,0.543], [52.794,0.238], [52.13,0.478]];
            let values = [polygon];
            let badValues = ['asdasd'];

            expect(this.test.value(key, values))
                .to.equal('?poly=52.268,0.543:52.794,0.238:52.13,0.478');

            expect(this.test.value(key, badValues))
                .to.equal('');
        });

        it('polygon - over 3000 chars');

        it('date - optional, as YYYY-MM', function() {
            let key = ['date'];
            let correctValue = ['2020-1-15'];
            let badValue = ['asdasd'];

            expect(this.test.value(key, correctValue))
                .to.equal('?date=2020-01');

            expect(this.test.value(key, badValue))
                .to.equal('');
        });

        it('without optional values', function() {
            let keys = ['coords', 'date'];
            let values = [[5.555, 1.009]];

            expect(this.test.value(keys, values))
                .to.include('lat', `Query stiring does not have all keys.`)
                .and.include('lng', `Query stiring does not have all keys.`);

            expect(this.test.value(keys, values))
                .to.include(values[0][0], `Query string is missing value.`)
                .and.include(values[0][1], `Query string is missing value.`);

            expect(this.test.value(keys, values))
                .to.not.include('date', 'Query string tried to pass not defined value');
        });

    });
});