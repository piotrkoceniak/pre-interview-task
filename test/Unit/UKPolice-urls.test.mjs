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

      it('returns correct url', function() {
        assert.equal(
          this.test.value.neighbourhood(exampleForceId, exampleNeighbourhoodId),
          `https://data.police.uk/api/${exampleForceId}/${exampleNeighbourhoodId}`,
          'Example force not found.'
          );
      });

    });

    describe('officers - officers for a given force', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('officers');
      });

      it('rejects when missing argument', function() {
        expect(this.test.value.officers).to.throw('Missing Argument');
      });

      let exampleForceId = 'lincolnshire';
      let badForceId = 'foobar';

      it('reject not existing force', function() {
        expect(() => this.test.value.officers(badForceId)).to.throw(
          'Bad Argument',
          'Bad force was undetected.'
          );
      });

      it('returns correct url', function() {
        assert.equal(
          this.test.value.officers(exampleForceId),
          `https://data.police.uk/api/forces/${exampleForceId}/people`,
          'Example force not found.'
          );
      });
    });

    describe('crimesAtPoint - at point', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('crimesAtPoint');
      });

      it('rejects when missing arguments', function() {
        expect(this.test.value.crimesAtPoint).to.throw('Missing Argument');
      });

      let exampleCategory = 'all-crime';
      let badCategory = 'foobar';

      it('reject not existing category', function() {
        expect(() => this.test.value.crimesAtPoint(badCategory)).to.throw(
          'Bad Argument',
          'Bad force was undetected.'
          );
      });

      it('reject when missing coords', function() {
        expect(() => this.test.value.crimesAtPoint(exampleCategory)).to.throw(
          'Missing Argument',
          'Missing argument - coordinates'
          );
      });

      it('returns correct url for a point', function() {
        let coords = [52.629729, -1.131592];
        assert.equal(
          this.test.value.crimesAtPoint(exampleCategory, coords),
          `https://data.police.uk/api/crimes-street/${exampleCategory}?lat=52.629729&lng=-1.131592`,
          'Example force not found.'
          );
      });
    });

    describe('outcomesAround', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('outcomesAround');
      });

      it('rejects when missing arguments', function() {
        expect(this.test.value.outcomesAround).to.throw('Missing Argument');
      });

      it('uses last month when no date given', function() {
        let coords = [52.629729, -1.131592];

        expect(this.test.value.outcomesAround(coords))
          .to.include(new UKPolice().lastUpdated);
      });

      it('returns correct url for a point', function() {
        let coords = [52.629729, -1.131592];
        let date = '2021-07';
        assert.equal(
          this.test.value.outcomesAround(coords, date),
          `https://data.police.uk/api/outcomes-at-location?lat=52.629729&lng=-1.131592&date=2021-07`
          );
      });
    });
    
    describe('outcomesAtLocation', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('outcomesAtLocation');
      });

      it('rejects when missing arguments', function() {
        expect(this.test.value.outcomesAtLocation).to.throw('Missing Argument');
      });

      it('uses last month when no date given', function() {
        let locationId = 883498;

        expect(this.test.value.outcomesAtLocation(locationId))
          .to.include(new UKPolice().lastUpdated);
      });

      it('returns correct url for a point', function() {
        let locationId = 883498;
        let date = '2021-07';
        assert.equal(
          this.test.value.outcomesAtLocation(locationId, date),
          `https://data.police.uk/api/outcomes-at-location?location_id=883498&date=2021-07`
          );
      });
    });

    describe('outcomeForCrime', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('outcomeForCrime');
      });

      it('rejects when missing arguments', function() {
        expect(this.test.value.outcomeForCrime).to.throw('Missing Argument');
      });

      it('rejects when crimeID different than 64 chars', function() {
        let crimeId = 883498;

        expect(() => this.test.value.outcomeForCrime(crimeId))
          .to.throw('Bad Argument');
      });

      it('returns correct url for a point', function() {
        let crimeId = '590d68b69228a9ff95b675bb4af591b38de561aa03129dc09a03ef34f537588c';
        assert.equal(
          this.test.value.outcomeForCrime(crimeId),
          `https://data.police.uk/api/outcomes-for-crime/${crimeId}`
          );
      });
    });

    describe('crimesAtLocation', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('crimesAtLocation');
      });

      it('rejects when missing arguments', function() {
        expect(this.test.value.crimesAtLocation).to.throw('Missing Argument');
      });

      it('uses last month when no date given', function() {
        let locationId = 883498;

        expect(this.test.value.crimesAtLocation(locationId))
          .to.include(new UKPolice().lastUpdated);
      });

      it('returns correct url for a point', function() {
        let locationId = 883498;
        let date = '2021-07';
        assert.equal(
          this.test.value.crimesAtLocation(locationId, date),
          `https://data.police.uk/api/crimes-at-location?location_id=883498&date=2021-07`
          );
      });
    });

    describe('crimesAround', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('crimesAround');
      });

      it('rejects when missing arguments', function() {
        expect(this.test.value.crimesAround).to.throw('Missing Argument');
      });

      it('uses last month when no date given', function() {
        let coords = [52.629729, -1.131592];

        expect(this.test.value.crimesAround(coords))
          .to.include(new UKPolice().lastUpdated);
      });

      it('returns correct url for a point', function() {
        let coords = [52.629729, -1.131592];
        let date = '2021-07';
        assert.equal(
          this.test.value.crimesAround(coords, date),
          `https://data.police.uk/api/crimes-at-location?lat=52.629729&lng=-1.131592&date=2021-07`
          );
      });
    });

    describe('crimesNoLocation', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('crimesNoLocation');
      });

      it('rejects missing arguments', function() {
        expect(this.test.value.crimesNoLocation).to.throw('Missing Argument');
      });

      let exampleForceId = 'lincolnshire';
      let badForceId = 'foobar';
      let exampleCategory = 'all-crime';
      let badCategory = 'foobar';

      it('reject not existing category', function() {
        expect(() => this.test.value.crimesNoLocation(badCategory, exampleForceId)).to.throw(
          'Bad Argument',
          'Bad force was undetected.'
          );
      });

      it('rejects not existing force', function() {
        expect(() => this.test.value.crimesNoLocation(exampleCategory, badForceId)).to.throw(
          'Bad Argument',
          'Bad force was undetected.'
          );
      });

      it('returns correct url', function() {
        let date = '2021-05';

        assert.equal(
          this.test.value.crimesNoLocation(exampleCategory, exampleForceId, date),
          `https://data.police.uk/api/crimes-no-location?category=${exampleCategory}&force=${exampleForceId}&date=2021-05`,
          'Example force not found.'
          );
      });
    });

    describe('crimeCategories', function() {
      beforeEach(function () {
        this.currentTest.value = new UKPolice().urls;
      });

      it('exists', function() {
        expect(this.test.value).to.respondTo('crimeCategories');
      });

      it('uses last month when no date given', function() {
        expect(this.test.value.crimeCategories())
          .to.include(new UKPolice().lastUpdated);
      });

      it('returns correct url for a point', function() {
        let date = '2021-05';
        assert.equal(
          this.test.value.crimeCategories(date),
          `https://data.police.uk/api/crime-categories?date=2021-05`
          );
        assert.equal(
          this.test.value.crimeCategories(),
          `https://data.police.uk/api/crime-categories?date=${new UKPolice().lastUpdated}`
          );
      });
    });
    
    describe.skip('timeLastUpdate', function() {
      
    });
    describe.skip('neighbourhoodBorder', function() {
      
    });
    describe.skip('localTeam', function() {
      
    });
    describe.skip('events', function() {
      
    });
    describe.skip('priorities', function() {
      
    });
    describe.skip('neighbourhoodFromPoint', function() {
      
    });
    describe.skip('searchesAtPoint', function() {
      
    });
    describe.skip('searchesAtLocation', function() {
      
    });
    describe.skip('searchesByForce', function() {
      
    });
});
