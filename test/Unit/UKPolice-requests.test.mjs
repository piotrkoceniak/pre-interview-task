import { UKPolice } from "../../js/UKPolice/UKPolice.mjs";
import { UsesFetch } from "../../js/UKPolice/UsesFetch.mjs";
import { assert, expect } from 'chai';

// mocha test/Unit/UKPolice-requests.test.mjs

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
        it('example request', async function(done) {
            const client = new UKPolice();
            client.handleResponse = response => {
                console.log(response);
                if(!response.ok) done(false);

                if(response.status != 200) done(false);

                done();
            };

            await fetch('https://data.police.uk/api/crime-categories?date=2020-08')
                .then((res) => {
                    return res.json()
                })
                .then(client.handleResponse);

            //result = await client.sendRequest('https://data.police.uk/api/crime-categories?date=2020-08',
            //                   client.__init);
        });
    });
    describe.skip('handles');
});