import 'assert';
import 'chai';
import { assert, expect } from 'chai';
import { UKPolice } from '../js/UKPolice/UKPolice.mjs';

describe('UKPolice', function() {
    it('class exists', function() {
        const object = new UKPolice();

        expect(object).to.be.an('object').that.is.not.empty;
    });
  describe('has property', function() {
    beforeEach(function () {
      this.currentTest.value = new UKPolice();
    });
            
    it('baseURL', function() {
      expect(this.test.value.baseURL).to.equal('https://data.police.uk/api/');
    });

    it('urls', function() {
      expect(this.test.value.urls).to.be.an('object').that.is.not.empty;
    });

    
  });
});