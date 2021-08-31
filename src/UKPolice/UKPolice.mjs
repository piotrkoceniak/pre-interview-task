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



    // forces, teams
    forces(callbackFunction) {
        this.get(
            this.urls.forces(), 
            callbackFunction
        );
    }
    __setForces() {
        if(!this.teams) {
            this.forces((results) => {
                if(Array.isArray(results)) {
                    for(let i = 0; i < results.length; i++) {
                        let object = {};
                        object[results[i].id] = results[i].name; 
                        
                        Object.assign(
                            this.teams, 
                            object
                        );
                    }
                }
            });
        }
    }
    neibourhoods(forceId, callbackFunction) {
        this.get(
            this.urls.neighbourhoods(forceId), 
            callbackFunction
        );
    }

    force(forceId, callbackFunction) {
        this.__setForces();
        
        this.get(
            this.urls.force(forceId), 
            callbackFunction
        );
    }

    neighbourhood(forceId, neighbourhoodId, callbackFunction) {
        this.get(
            this.urls.neighbourhood(forceId, neighbourhoodId),
            callbackFunction
        );
    }

    // crimes
    __setCategories() {
        if(!this.crimeCategories) {
            this.crimeCategories(this.lastUpdated, (results) => {
                if(Array.isArray(results)) {
                    for(let i = 0; i < results.length; i++) {
                        let object = {};
                        object[results[i].url] = results[i].name; 
                        
                        Object.assign(
                            this.crimeCategories, 
                            object
                        );
                    }
                }
            });
        }
    }
    crimeCategories(date, callbackFunction) {
        this.get(
            this.urls.crimeCategories(date),
            callbackFunction
        );
    }

    // people

    // priorities


}