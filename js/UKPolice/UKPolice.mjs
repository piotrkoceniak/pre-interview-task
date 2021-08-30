export class UKPolice {
    constructor() {

        this.urls.forces = this.urls.forces.bind(this);
        this.urls.neighbourhoods = this.urls.neighbourhoods.bind(this);
        this.urls.force = this.urls.force.bind(this);
        this.urls.neighbourhood = this.urls.neighbourhood.bind(this);
        this.urls.officers = this.urls.officers.bind(this);
        this.urls.crimesAtPoint = this.urls.crimesAtPoint.bind(this);
        this.urls.outcomesAround = this.urls.outcomesAround.bind(this);
        this.urls.outcomesAtLocation = this.urls.outcomesAtLocation.bind(this);
        this.urls.outcomeForCrime = this.urls.outcomeForCrime.bind(this);
        this.urls.crimesAtLocation = this.urls.crimesAtLocation.bind(this);
        this.urls.crimesAround = this.urls.crimesAround.bind(this);
        this.urls.crimesNoLocation = this.urls.crimesNoLocation.bind(this);
        this.urls.crimeCategories = this.urls.crimeCategories.bind(this);
    }

    baseURL = 'https://data.police.uk/api/';
    lastUpdated = '2021-07';

    urls = {
        forces() {
            return this.baseURL + 'forces';
        },
        neighbourhoods(forceId) {
            if(!forceId) throw new Error('Missing Argument')
            else if(!this.teams[forceId]) throw new Error('Bad Argument');

            return this.baseURL + `${forceId}/neighbourhoods`;
        },
        force(forceId) {
            if(!forceId) throw new Error('Missing Argument')
            else if(!this.teams[forceId]) throw new Error('Bad Argument');

            return this.baseURL + `forces/${forceId}`;
        },
        neighbourhood(forceId, neighbourhoodId) {
            if(!forceId) throw new Error('Missing Argument')
            else if(!this.teams[forceId]) throw new Error('Bad Argument');

            if(!neighbourhoodId) throw new Error('Missing Argument')
            else if(!this.neighbourhood[neighbourhoodId]) throw new Error('Bad Argument');

            return this.baseURL + `${forceId}/${neighbourhoodId}`;
        },
        officers(forceId) {
            if(!forceId) throw new Error('Missing Argument')
            else if(!this.teams[forceId]) throw new Error('Bad Argument');

            return this.baseURL + `forces/${forceId}/people`;
        },
        crimesAtPoint(category, coords, date) {
            if(!category) throw new Error('Missing Argument')
            else if(!this.crimeCategories[category]) throw new Error('Bad Argument');

            if(!coords) throw new Error('Missing Argument')
            else if(!Array.isArray(coords)) throw new Error('Bad Argument');

            return this.baseURL + 
                `crimes-street/${category}${this.queryString(
                    ['coords', 'date'], 
                    [coords, date])}`;
        },
        outcomesAround(coords, date = this.lastUpdated) {
            if(!coords) throw new Error('Missing Argument')
            else if(!Array.isArray(coords)) throw new Error('Bad Argument');

            return this.baseURL + 
                `outcomes-at-location` +
                this.queryString(['coords', 'date'], [coords, date]);
        },
        outcomesAtLocation(locationId, date = this.lastUpdated) {
            if(!locationId) throw new Error('Missing Argument')
            else if(!Number.isInteger(locationId)) throw new Error('Bad Argument');

            return this.baseURL + 
                `outcomes-at-location` +
                this.queryString(['location', 'date'], [locationId, date]);
        },
        outcomeForCrime(crimeId) {
            if(!crimeId) throw new Error('Missing Argument')
            else if(`${crimeId}`.length != 64) throw new Error('Bad Argument');

            return this.baseURL + `outcomes-for-crime/${crimeId}`;
        },
        crimesAtLocation(locationId, date = this.lastUpdated) {
            if(!locationId) throw new Error('Missing Argument')
            else if(!Number.isInteger(locationId)) throw new Error('Bad Argument');

            return this.baseURL + 
                `crimes-at-location` +
                this.queryString(['location', 'date'], [locationId, date]);
        },
        crimesAround(coords, date = this.lastUpdated) {
            if(!coords) throw new Error('Missing Argument')
            else if(!Array.isArray(coords)) throw new Error('Bad Argument');

            return this.baseURL + 
                `crimes-at-location` +
                this.queryString(['coords', 'date'], [coords, date]);
        },
        crimesNoLocation(category, forceId, date = this.lastUpdated) {
            if(!category) throw new Error('Missing Argument')
            else if(!this.crimeCategories[category]) throw new Error('Bad Argument');

            if(!forceId) throw new Error('Missing Argument')
            else if(!this.teams[forceId]) throw new Error('Bad Argument');

            return this.baseURL + 'crimes-no-location' +
                this.queryString(
                    ['category', 'force', 'date'],
                    [category, forceId, date]
                    );
        },
        crimeCategories(date = this.lastUpdated) {
            return this.baseURL + `crime-categories${this.queryString(['date'], [date])}`
        }
    }

    crimeCategories = {
        "all-crime":"All crime"
    }

    teams = {
        'lincolnshire': 'test',
    }

    neighbourhood = {
        'NC13': 'test'
    }

    queryString(keys, values) {
        if(!keys || !values) throw new Error('Missing Argument')
        else if(!Array.isArray(keys) 
            || !Array.isArray(values)) throw new Error('Bad Argument');

        
        let query = '?';
        for(let i = 0; i < values.length; i++) {
            switch(keys[i]) {
                case 'category':
                    query += `category=${values[i]}&`;
                    break;
                case 'force':
                    query += `force=${values[i]}&`;
                    break;
                case 'location':
                    query += `location_id=${values[i]}&`
                    break;
                case 'coords':
                    query += `lat=${values[i][0]}&lng=${values[i][1]}&`;
                    break;
                case 'date': // optional 
                    if(values[i]) {
                        let d = new Date(values[i]);
                        if(d.valueOf()) {
                            let month = d.getMonth() >= 9 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;
                            query += `date=${d.getFullYear()}-${month}&`;
                        }
                    }
                    break;
                case 'poly':
                    let points = '';

                    let polygon = values[i];

                    if(Array.isArray(polygon)) {
                        polygon.forEach(point => {
                            if(Array.isArray(point)) {
                                points += `${point[0]},${point[1]}:`;
                            }
                        });
                    }

                    points = points.substring(0, points.length - 1);

                    if(points.length > 3000) throw new Error('Too long polygon. Use POST request.');
                    query += points ? `poly=${points}&` : '';
                    break;
            }
        }

        return query.substring(0, query.length - 1);
    }

    
}