export class UKPolice {
    constructor() {

        this.urls.forces = this.urls.forces.bind(this);
        this.urls.neighbourhoods = this.urls.neighbourhoods.bind(this);
        this.urls.force = this.urls.force.bind(this);
        this.urls.neighbourhood = this.urls.neighbourhood.bind(this);
    }

    baseURL = 'https://data.police.uk/api/';

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
        }
    }

    teams = {
        'lincolnshire': 'test',
    }

    neighbourhood = {
        'NC13': 'test'
    }

}