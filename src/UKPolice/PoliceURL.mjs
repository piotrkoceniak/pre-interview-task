import { UsesFetch } from "./UsesFetch.mjs";

export class PoliceURL extends UsesFetch {
    constructor(props) {
        super(props);
    }

    baseURL = 'https://data.police.uk/api/';
    urls = {
        forces() {
            return this.baseURL + 'forces';
        },
        neighbourhoods(forceId) {
            if(!forceId) throw new Error('Missing Argument');

            return this.baseURL + `${forceId}/neighbourhoods`;
        },
        force(forceId) {
            if(!forceId) throw new Error('Missing Argument');

            return this.baseURL + `forces/${forceId}`;
        },
        neighbourhood(forceId, neighbourhoodId) {
            if(!forceId) throw new Error('Missing Argument');

            if(!neighbourhoodId) throw new Error('Missing Argument')

            return this.baseURL + `${forceId}/${neighbourhoodId}`;
        },
        officers(forceId) {
            if(!forceId) throw new Error('Missing Argument');

            return this.baseURL + `forces/${forceId}/people`;
        },
        crimesAtPoint(category, coords, date) {
            if(!category) throw new Error('Missing Argument');

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
            if(!category) throw new Error('Missing Argument');

            if(!forceId) throw new Error('Missing Argument');

            return this.baseURL + 'crimes-no-location' +
                this.queryString(
                    ['category', 'force', 'date'],
                    [category, forceId, date]
                    );
        },
        crimeCategories(date = this.lastUpdated) {
            return this.baseURL + `crime-categories${this.queryString(['date'], [date])}`
        },
        lastUpdated() {
            return this.baseURL + 'crime-last-updated';
        },
        boundary(forceId, neighbourhoodId) {
            if(!forceId) throw new Error('Missing Argument');

            if(!neighbourhoodId) throw new Error('Missing Argument');

            return this.baseURL + `${forceId}/${neighbourhoodId}/boundary`;
        },
        locate(coords) {
            if(!coords) throw new Error('Missing Argument');

            return this.baseURL + 
                `locate-neighbourhood?q=${coords[0]},${coords[1]}`;

        },
        priorities(forceId, neighbourhoodId) {
            if(!forceId) throw new Error('Missing Argument');

            if(!neighbourhoodId) throw new Error('Missing Argument')

            return this.baseURL + `${forceId}/${neighbourhoodId}/priorities`;
        }

    }

    crimeCategories = null;
    lastUpdated = '';

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