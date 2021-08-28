import 'assert';
import 'chai';
import { assert, expect } from 'chai';
import { UKPolice } from '../../js/UKPolice/UKPolice.mjs';


describe('UKPolice property - URLS as methods returning url for', function() {
    beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
    });
    
    it('forces - all forces', function() {
      expect(this.test.value).to.respondTo('forces');
      assert.equal(
        this.test.value.forces(), 
        'https://data.police.uk/api/forces'
        );
    });

    describe('neighbourhoods - all teams for given force', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('neighbourhoods');
      })
      
      let exampleForce = 'lincolnshire';
      let badForce = 'foobar';

      it('returns correct url', function() {
        assert.equal(
          this.test.value.neighbourhoods(exampleForce),
          `https://data.police.uk/api/${exampleForce}/neighbourhoods`,
          'Example force not found.'
          );
      });

      it('reject no input', function() {
        expect(this.test.value.neighbourhoods).to.throw('Missing Argument');
      });
      
      it('rejects not existing', function() {
        expect(() => this.test.value.neighbourhoods(badForce)).to.throw(
          'Bad Argument',
          'Bad force was undetected.'
          );
      });
    });

    describe('force - specific force', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('force');
      });

      it('rejects missing arguments', function() {
        expect(this.test.value.force).to.throw('Missing Argument');
      });

      let exampleForceId = 'lincolnshire';
      let badForceId = 'foobar';

      it('returns correct url', function() {
        assert.equal(
          this.test.value.force(exampleForceId),
          `https://data.police.uk/api/forces/${exampleForceId}`,
          'Example force not found.'
          );
      });

      it('rejects not existing force', function() {
        expect(() => this.test.value.force(badForceId)).to.throw(
          'Bad Argument',
          'Bad force was undetected.'
          );
      });
    });

    describe('neighbourhood - specific team', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('neighbourhood');
      });

      it('rejects when missing arguments', function() {
        expect(this.test.value.neighbourhood).to.throw('Missing Argument');
      });

      let exampleForceId = 'lincolnshire';
      let badForceId = 'foobar';

      it('reject missing team', function() {
        expect(() => this.test.value.neighbourhood(exampleForceId)).to.throw(
          'Missing Argument'
          );
      });

      it('reject not existing force', function() {
        expect(() => this.test.value.neighbourhood(badForceId)).to.throw(
          'Bad Argument',
          'Bad force was undetected.'
          );
      });

      let exampleNeighbourhoodId = 'NC13';
      let badNeighbourhoodId = 'foobar';

      it('reject not existing team', function() {
        expect(() => this.test.value.neighbourhood(exampleForceId, badNeighbourhoodId)).to.throw(
          'Bad Argument',
          'Bad force was undetected.'
          );
      });

      it('returns correct url', function() {
        assert.equal(
          this.test.value.neighbourhood(exampleForceId, exampleNeighbourhoodId),
          `https://data.police.uk/api/${exampleForceId}/${exampleNeighbourhoodId}`,
          'Example force not found.'
          );
      });

    });
});
