/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UKPolice_UKPolice_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UKPolice/UKPolice.mjs */ \"./src/UKPolice/UKPolice.mjs\");\n\n\nconst police = new _UKPolice_UKPolice_mjs__WEBPACK_IMPORTED_MODULE_0__.UKPolice();\n\nvar mymap = L.map('mapid').setView([51.505, -0.09], 13);\n\nvar tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n                maxZoom: 19,\n                attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n            }).addTo(mymap);\n\n//# sourceURL=webpack://uk-police-data-handler/./src/index.js?");

/***/ }),

/***/ "./src/UKPolice/PoliceURL.mjs":
/*!************************************!*\
  !*** ./src/UKPolice/PoliceURL.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PoliceURL\": () => (/* binding */ PoliceURL)\n/* harmony export */ });\n/* harmony import */ var _UsesFetch_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsesFetch.mjs */ \"./src/UKPolice/UsesFetch.mjs\");\n\n\nclass PoliceURL extends _UsesFetch_mjs__WEBPACK_IMPORTED_MODULE_0__.UsesFetch {\n    constructor(props) {\n        super(props);\n    }\n\n    baseURL = 'https://data.police.uk/api/';\n    urls = {\n        forces() {\n            return this.baseURL + 'forces';\n        },\n        neighbourhoods(forceId) {\n            if(!forceId) throw new Error('Missing Argument')\n            else if(!this.teams[forceId]) throw new Error('Bad Argument');\n\n            return this.baseURL + `${forceId}/neighbourhoods`;\n        },\n        force(forceId) {\n            if(!forceId) throw new Error('Missing Argument')\n            else if(!this.teams[forceId]) throw new Error('Bad Argument');\n\n            return this.baseURL + `forces/${forceId}`;\n        },\n        neighbourhood(forceId, neighbourhoodId) {\n            if(!forceId) throw new Error('Missing Argument')\n            else if(!this.teams[forceId]) throw new Error('Bad Argument');\n\n            if(!neighbourhoodId) throw new Error('Missing Argument')\n\n            return this.baseURL + `${forceId}/${neighbourhoodId}`;\n        },\n        officers(forceId) {\n            if(!forceId) throw new Error('Missing Argument')\n            else if(!this.teams[forceId]) throw new Error('Bad Argument');\n\n            return this.baseURL + `forces/${forceId}/people`;\n        },\n        crimesAtPoint(category, coords, date) {\n            if(!category) throw new Error('Missing Argument')\n            else if(!this.crimeCategories[category]) throw new Error('Bad Argument');\n\n            if(!coords) throw new Error('Missing Argument')\n            else if(!Array.isArray(coords)) throw new Error('Bad Argument');\n\n            return this.baseURL + \n                `crimes-street/${category}${this.queryString(\n                    ['coords', 'date'], \n                    [coords, date])}`;\n        },\n        outcomesAround(coords, date = this.lastUpdated) {\n            if(!coords) throw new Error('Missing Argument')\n            else if(!Array.isArray(coords)) throw new Error('Bad Argument');\n\n            return this.baseURL + \n                `outcomes-at-location` +\n                this.queryString(['coords', 'date'], [coords, date]);\n        },\n        outcomesAtLocation(locationId, date = this.lastUpdated) {\n            if(!locationId) throw new Error('Missing Argument')\n            else if(!Number.isInteger(locationId)) throw new Error('Bad Argument');\n\n            return this.baseURL + \n                `outcomes-at-location` +\n                this.queryString(['location', 'date'], [locationId, date]);\n        },\n        outcomeForCrime(crimeId) {\n            if(!crimeId) throw new Error('Missing Argument')\n            else if(`${crimeId}`.length != 64) throw new Error('Bad Argument');\n\n            return this.baseURL + `outcomes-for-crime/${crimeId}`;\n        },\n        crimesAtLocation(locationId, date = this.lastUpdated) {\n            if(!locationId) throw new Error('Missing Argument')\n            else if(!Number.isInteger(locationId)) throw new Error('Bad Argument');\n\n            return this.baseURL + \n                `crimes-at-location` +\n                this.queryString(['location', 'date'], [locationId, date]);\n        },\n        crimesAround(coords, date = this.lastUpdated) {\n            if(!coords) throw new Error('Missing Argument')\n            else if(!Array.isArray(coords)) throw new Error('Bad Argument');\n\n            return this.baseURL + \n                `crimes-at-location` +\n                this.queryString(['coords', 'date'], [coords, date]);\n        },\n        crimesNoLocation(category, forceId, date = this.lastUpdated) {\n            if(!category) throw new Error('Missing Argument')\n            else if(!this.crimeCategories[category]) throw new Error('Bad Argument');\n\n            if(!forceId) throw new Error('Missing Argument')\n            else if(!this.teams[forceId]) throw new Error('Bad Argument');\n\n            return this.baseURL + 'crimes-no-location' +\n                this.queryString(\n                    ['category', 'force', 'date'],\n                    [category, forceId, date]\n                    );\n        },\n        crimeCategories(date = this.lastUpdated) {\n            return this.baseURL + `crime-categories${this.queryString(['date'], [date])}`\n        }\n    }\n\n    crimeCategories = {}\n    teams = {}\n    lastUpdated = '2021-07';\n\n    queryString(keys, values) {\n        if(!keys || !values) throw new Error('Missing Argument')\n        else if(!Array.isArray(keys) \n            || !Array.isArray(values)) throw new Error('Bad Argument');\n\n        \n        let query = '?';\n        for(let i = 0; i < values.length; i++) {\n            switch(keys[i]) {\n                case 'category':\n                    query += `category=${values[i]}&`;\n                    break;\n                case 'force':\n                    query += `force=${values[i]}&`;\n                    break;\n                case 'location':\n                    query += `location_id=${values[i]}&`\n                    break;\n                case 'coords':\n                    query += `lat=${values[i][0]}&lng=${values[i][1]}&`;\n                    break;\n                case 'date': // optional \n                    if(values[i]) {\n                        let d = new Date(values[i]);\n                        if(d.valueOf()) {\n                            let month = d.getMonth() >= 9 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;\n                            query += `date=${d.getFullYear()}-${month}&`;\n                        }\n                    }\n                    break;\n                case 'poly':\n                    let points = '';\n\n                    let polygon = values[i];\n\n                    if(Array.isArray(polygon)) {\n                        polygon.forEach(point => {\n                            if(Array.isArray(point)) {\n                                points += `${point[0]},${point[1]}:`;\n                            }\n                        });\n                    }\n\n                    points = points.substring(0, points.length - 1);\n\n                    if(points.length > 3000) throw new Error('Too long polygon. Use POST request.');\n                    query += points ? `poly=${points}&` : '';\n                    break;\n            }\n        }\n\n        return query.substring(0, query.length - 1);\n    }\n}\n\n//# sourceURL=webpack://uk-police-data-handler/./src/UKPolice/PoliceURL.mjs?");

/***/ }),

/***/ "./src/UKPolice/UKPolice.mjs":
/*!***********************************!*\
  !*** ./src/UKPolice/UKPolice.mjs ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UKPolice\": () => (/* binding */ UKPolice)\n/* harmony export */ });\n/* harmony import */ var _PoliceURL_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PoliceURL.mjs */ \"./src/UKPolice/PoliceURL.mjs\");\n\n\nclass UKPolice extends _PoliceURL_mjs__WEBPACK_IMPORTED_MODULE_0__.PoliceURL {\n    constructor(props) {\n        super(props);\n\n        this.urls.forces = this.urls.forces.bind(this);\n        this.urls.neighbourhoods = this.urls.neighbourhoods.bind(this);\n        this.urls.force = this.urls.force.bind(this);\n        this.urls.neighbourhood = this.urls.neighbourhood.bind(this);\n        this.urls.officers = this.urls.officers.bind(this);\n        this.urls.crimesAtPoint = this.urls.crimesAtPoint.bind(this);\n        this.urls.outcomesAround = this.urls.outcomesAround.bind(this);\n        this.urls.outcomesAtLocation = this.urls.outcomesAtLocation.bind(this);\n        this.urls.outcomeForCrime = this.urls.outcomeForCrime.bind(this);\n        this.urls.crimesAtLocation = this.urls.crimesAtLocation.bind(this);\n        this.urls.crimesAround = this.urls.crimesAround.bind(this);\n        this.urls.crimesNoLocation = this.urls.crimesNoLocation.bind(this);\n        this.urls.crimeCategories = this.urls.crimeCategories.bind(this);\n    }\n\n\n\n    // forces, teams\n    forces(callbackFunction) {\n        this.get(\n            this.urls.forces(), \n            callbackFunction\n        );\n    }\n    __setForces() {\n        if(!this.teams) {\n            this.forces((results) => {\n                if(Array.isArray(results)) {\n                    for(let i = 0; i < results.length; i++) {\n                        let object = {};\n                        object[results[i].id] = results[i].name; \n                        \n                        Object.assign(\n                            this.teams, \n                            object\n                        );\n                    }\n                }\n            });\n        }\n    }\n    neibourhoods(forceId, callbackFunction) {\n        this.get(\n            this.urls.neighbourhoods(forceId), \n            callbackFunction\n        );\n    }\n\n    force(forceId, callbackFunction) {\n        this.__setForces();\n        \n        this.get(\n            this.urls.force(forceId), \n            callbackFunction\n        );\n    }\n\n    neighbourhood(forceId, neighbourhoodId, callbackFunction) {\n        this.get(\n            this.urls.neighbourhood(forceId, neighbourhoodId),\n            callbackFunction\n        );\n    }\n\n    // crimes\n    __setCategories() {\n        if(!this.crimeCategories) {\n            this.crimeCategories(this.lastUpdated, (results) => {\n                if(Array.isArray(results)) {\n                    for(let i = 0; i < results.length; i++) {\n                        let object = {};\n                        object[results[i].url] = results[i].name; \n                        \n                        Object.assign(\n                            this.crimeCategories, \n                            object\n                        );\n                    }\n                }\n            });\n        }\n    }\n    crimeCategories(date, callbackFunction) {\n        this.get(\n            this.urls.crimeCategories(date),\n            callbackFunction\n        );\n    }\n\n    // people\n\n    // priorities\n\n\n}\n\n//# sourceURL=webpack://uk-police-data-handler/./src/UKPolice/UKPolice.mjs?");

/***/ }),

/***/ "./src/UKPolice/UsesFetch.mjs":
/*!************************************!*\
  !*** ./src/UKPolice/UsesFetch.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UsesFetch\": () => (/* binding */ UsesFetch)\n/* harmony export */ });\nclass UsesFetch {\n    setRequestBody(data) {\n        this.init.body = JSON.stringify(data);\n    }\n    setRequestMethod(method) {\n        this.init.method = method;\n    }\n\n    get(url, callback) {\n        let init = this.init;\n        this.init = false;\n        this.sendRequest(url, init, callback);\n    }\n    \n    async sendRequest(url, init = this.init, callback) {\n        fetch(url, init)\n            .then(function(response) {\n                if(!response.ok) {\n                    throw new Error('HTTP ERROR: ' + response.status);\n                }\n                return response.json();\n            })\n            .then((response) => {\n                callback(this.handleResponse(response));\n            });\n    }\n\n    handleResponse(response) {\n        if(this.handleStatus(response.status)) {\n            return response.body ? response.body : 'No results.';\n        } else return 'No contents.';\n    }\n\n    handleStatus(status) {\n        switch(status) {\n            case 200:\n                return true;\n                break;\n            case 404:\n                return false;\n                break;\n            case 503:\n                throw new Error('Too many results!');\n                break;\n        }\n    }\n\n    __init = {\n        method: 'GET',\n        mode: 'cors',\n        cache: 'no-cache',\n        credentials: 'same-origin', \n        headers: {\n          'Content-Type': 'application/json'\n        },\n        redirect: 'follow',\n        referrerPolicy: 'no-referrer',\n        body: ''\n    }\n    init = {};\n\n    get init() {\n        return Object.assign({}, this.__init, this.init);\n    }\n    set init(newInitObject) {\n        this.init = newInitObject ? this.init.merge(newInitObject) : {};\n    }\n\n}\n\n//# sourceURL=webpack://uk-police-data-handler/./src/UKPolice/UsesFetch.mjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;