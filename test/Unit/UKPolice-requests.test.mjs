import { UKPolice } from "./../../src/UKPolice/UKPolice.mjs";
import { UsesFetch } from "../../src/UKPolice/UsesFetch.mjs";
import { assert, expect } from 'chai';

describe('UKPolice ', function() {
    describe('extends ', function() {
        it('UsesFetch', function() {
            const client = new UKPolice();

            expect(client).to.be.instanceOf(UsesFetch);
        });
    });
    
    describe('makes', function() {
        it('request');
    });
    describe.skip('handles');
});