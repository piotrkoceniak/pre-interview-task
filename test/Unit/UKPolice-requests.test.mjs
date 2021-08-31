import { UKPolice } from "../../js/UKPolice/UKPolice.mjs";
import { UsesFetch } from "../../js/UKPolice/UsesFetch.mjs";
import { assert, expect } from 'chai';

describe('UKPolice ', function() {
    describe('extends ', function() {
        it('UsesFetch', function() {
            const client = new UKPolice();

            expect(client).to.be.instanceOf(UsesFetch);
        });
    });

    describe('has template', function() {
        it('init object', function() {
            const client = new UKPolice();

            expect(client.__init).to.be.deep.equal({
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin', 
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: ''
            });
        });
    });
    describe('makes', function() {
        it('request');
    });
    describe.skip('handles');
});