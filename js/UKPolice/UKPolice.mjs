import { PoliceURL } from "./PoliceURL.mjs";

export class UKPolice extends PoliceURL {
    constructor(props) {
        super(props);

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


    // TO DO
    crimeCategories = {
        "all-crime":"All crime"
    }

    teams = {
        'lincolnshire': 'test',
    }

    neighbourhood = {
        'NC13': 'test'
    }

    lastUpdated = '2021-07';
}