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
        this.urls.lastUpdated = this.urls.lastUpdated.bind(this);
        this.urls.boundary = this.urls.boundary.bind(this);
        this.urls.locate = this.urls.locate.bind(this);
        this.urls.priorities = this.urls.priorities.bind(this);
    }



    // forces, teams
    forces(callbackFunction) {
        this.get(
            this.urls.forces(), 
            callbackFunction
        );

        this.__setLastUpdated();
        this.__setCategories();
    }
    
    neighbourhoods(forceId, callbackFunction) {
        this.get(
            this.urls.neighbourhoods(forceId), 
            callbackFunction
        );

        this.__setLastUpdated();
        this.__setCategories();
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

    boundary(forceId, neighbourhoodId, callbackFunction) {
        this.get(
            this.urls.boundary(forceId, neighbourhoodId),
            callbackFunction
        );
    }

    locate(coordinates, callbackFunction) {
        this.get(
            this.urls.locate(coordinates),
            callbackFunction
        );
    }

    // crimes
    __setCategories() {
        if(!this.crimeCategories) {
            this.crimeCategories = {};
            this.get(
                this.urls.crimeCategories(),
                response => {
                    response.forEach(category => {
                        Object.assign(this.crimeCategories, {
                            [category.url]: category.name
                        });
                    });
                }
            );
        }
    }
    categories(callbackFunction, date = this.lastUpdated) {
        this.get(
            this.urls.crimeCategories(date),
            callbackFunction
        );

        this.__setLastUpdated();
        this.__setCategories();
    }
    crimesHere(category, coords, callbackFunction) {
        this.get(
            this.urls.crimesAtPoint(category, coords),
            callbackFunction
        );
    }

    // people

    // priorities
    priorities(forceId, neighbourhoodId, callbackFunction) {
        this.get(
            this.urls.priorities(forceId, neighbourhoodId),
            callbackFunction
        );
    }

    // date
    __setLastUpdated() {
        if(!this.lastUpdated) {
            this.get(this.urls.lastUpdated(), (response) => {
                let d = new Date(response.date);
                if(d.valueOf()) {
                    let month = d.getMonth() >= 9 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;
                    this.lastUpdated = `${d.getFullYear()}-${month}`;
                }
            });
        }
        
    }


}