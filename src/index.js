import { UKPolice } from "./UKPolice/UKPolice.mjs";


// global declarations
const police = new UKPolice();

var mymap = L.map('mapid', {zoomControl: false}).setView([51.505, -0.09], 7);

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap);

L.control.zoom({position: "bottomleft"}).addTo(mymap);
L.control.scale({position: "bottomright"}).addTo(mymap);

var neighbourhoodPolygon = L.polygon([], {
    stroke: true,
    color: '#EC5630',
    opacity: 0.6,
    fill: true,
    fillOpacity: 0.2
});

var markers = L.layerGroup([], {
    attribution: 'Data comes from <a href="https://data.police.uk/">police.uk</a>'
}).addTo(mymap);

var category = document.getElementById('mapCrimeCategory');
var forceSelect = document.getElementById('mapForce');
var neighbourhood = document.getElementById('mapNeighbourhood');

var priorities = document.getElementById('priorities');

var userLocation = window.navigator.geolocation;





// after load
setSelects();

userLocation.getCurrentPosition(
    function(pos) {
        let latitude = Number.parseFloat(pos.coords.latitude).toFixed(2);
        let longitude = Number.parseFloat(pos.coords.longitude).toFixed(2);

        mymap.setView([latitude, longitude]);
        mymap.fireEvent(
            'click',
            {
                latlng: {
                    lat: latitude,
                    lng: longitude
                }
            });
    }
);







// event listeners
mymap
    .addEventListener(
        'moveend', 
        event => {
            let coords = mymap.getCenter();
            
            police.crimesHere(
                category.value,
                [coords.lat, coords.lng],
                response => {
                    setMarkers(response);
                }
        );
        
    });
mymap
    .addEventListener(
        'click',
        event => {
            police.locate(
                [event.latlng.lat, event.latlng.lng],
                response => {
                    if(response != 'Not Found') {
                        setBoundary(
                            response.force, 
                            response.neighbourhood
                            );

                        forceSelect.value = response.force;

                        setNeighbourhoods(
                            response.force, 
                            response.neighbourhood
                            );
                    }
                }
            )
        });

forceSelect
    .addEventListener(
        'change',
        event => {
            setNeighbourhoods(event.target.value);
    });

neighbourhood
    .addEventListener(
        'change',
        event => {
            setBoundary(forceSelect.value, event.target.value);
            setPriorities(forceSelect.value, event.target.value);
    });
category
    .addEventListener(
      'change',
      event => {
          mymap.fireEvent('moveend');
      }  
    );








// functions

function setSelects() {
    police.categories((response) => {
        setOptions('mapCrimeCategory', response);
    });
    police.forces((response) => {
        setOptions('mapForce', response);
        setNeighbourhoods(response[0].id);
    });
}
function setNeighbourhoods(id, selectOption = false) {
    police.neighbourhoods(id, (response) => {
        clearChildren('mapNeighbourhood');
        setOptions('mapNeighbourhood', response);
        
        let forceId = forceSelect.value;
        if(!selectOption) {
            setBoundary(forceId, response[0].id);
        } else {
            neighbourhood.value = selectOption;
        }

        setPriorities(forceId, selectOption || response[0].id);
    });
}

function setMarkers(data) {
    markers.clearLayers();

    if(Array.isArray(data)) {
        data.forEach(element => {
            let options = {
                title: police.crimeCategories[element.category],
                riseOnHover: true,
            };

            let latlng = [];
            if(element.location) {
                latlng.push(element.location.latitude);
                latlng.push(element.location.longitude);
            } else return;
    
            let marker = L.marker(
                latlng,
                options
            );
            markers.addLayer(marker);
        });
    }
}

function setBoundary(forceId, neighbourhoodId) {
    police.boundary(
        forceId, 
        neighbourhoodId, 
        response => {
            // conversion to Leaflet's LatLng array
            let array = [];
            response.forEach(point => {
                array.push([point.latitude, point.longitude])
            });

            neighbourhoodPolygon.setLatLngs(array).addTo(mymap);
            mymap.fitBounds(
                neighbourhoodPolygon.getBounds(),
                {
                    animate: true,
                    duration: 4,
                    easeLinearity: 1
                }
                );
        });
}

function setPriorities(forceId, neighbourhoodId) {
    police.priorities(
        forceId,
        neighbourhoodId,
        response => {
            clearChildren('priorities');

            response.forEach(priority => {
                var text = priority.issue;
                text += priority.action ? priority.action : '';

                text += '<p>Created: ' 
                    + new Date(priority['issue-date']).toDateString()
                    + '</p>';

                text += priority['action-date'] ? 
                    ('<p>Actioned: ' 
                        + new Date(priority['action-date']).toDateString()
                        + '</p>') :
                    '';

                var item = document.createElement('li');
                item.innerHTML = text;

                priorities.append(item);
            })
        }
    )
}

function setOptions(selectId, arrayOfValues) {
    var select = document.getElementById(selectId);

    arrayOfValues.forEach(value => {
        let option = document.createElement('option');
        option.value = value.url || value.id;
        option.innerText = value.name;

        select.append(option);
    });
    
    if(select.firstChild) select.firstChild.selected = true;
}
function clearChildren(id) {
    var node = document.getElementById(id);

    while(node.firstChild) node.removeChild(node.lastChild);
}