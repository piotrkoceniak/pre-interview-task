(()=>{"use strict";new class extends class extends class{setRequestBody(r){this.init.body=JSON.stringify(r)}setRequestMethod(r){this.init.method=r}get(r,t){let e=this.init;this.init=!1,this.sendRequest(r,e,t)}async sendRequest(r,t=this.init,e){fetch(r,t).then((function(r){if(!r.ok)throw new Error("HTTP ERROR: "+r.status);return r.json()})).then((r=>{e(this.handleResponse(r))}))}handleResponse(r){return this.handleStatus(r.status)?r.body?r.body:"No results.":"No contents."}handleStatus(r){switch(r){case 200:return!0;case 404:return!1;case 503:throw new Error("Too many results!")}}__init={method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:""};init={};get init(){return Object.assign({},this.__init,this.init)}set init(r){this.init=r?this.init.merge(r):{}}}{constructor(r){super(r)}baseURL="https://data.police.uk/api/";urls={forces(){return this.baseURL+"forces"},neighbourhoods(r){if(!r)throw new Error("Missing Argument");if(!this.teams[r])throw new Error("Bad Argument");return this.baseURL+`${r}/neighbourhoods`},force(r){if(!r)throw new Error("Missing Argument");if(!this.teams[r])throw new Error("Bad Argument");return this.baseURL+`forces/${r}`},neighbourhood(r,t){if(!r)throw new Error("Missing Argument");if(!this.teams[r])throw new Error("Bad Argument");if(!t)throw new Error("Missing Argument");return this.baseURL+`${r}/${t}`},officers(r){if(!r)throw new Error("Missing Argument");if(!this.teams[r])throw new Error("Bad Argument");return this.baseURL+`forces/${r}/people`},crimesAtPoint(r,t,e){if(!r)throw new Error("Missing Argument");if(!this.crimeCategories[r])throw new Error("Bad Argument");if(!t)throw new Error("Missing Argument");if(!Array.isArray(t))throw new Error("Bad Argument");return this.baseURL+`crimes-street/${r}${this.queryString(["coords","date"],[t,e])}`},outcomesAround(r,t=this.lastUpdated){if(!r)throw new Error("Missing Argument");if(!Array.isArray(r))throw new Error("Bad Argument");return this.baseURL+"outcomes-at-location"+this.queryString(["coords","date"],[r,t])},outcomesAtLocation(r,t=this.lastUpdated){if(!r)throw new Error("Missing Argument");if(!Number.isInteger(r))throw new Error("Bad Argument");return this.baseURL+"outcomes-at-location"+this.queryString(["location","date"],[r,t])},outcomeForCrime(r){if(!r)throw new Error("Missing Argument");if(64!=`${r}`.length)throw new Error("Bad Argument");return this.baseURL+`outcomes-for-crime/${r}`},crimesAtLocation(r,t=this.lastUpdated){if(!r)throw new Error("Missing Argument");if(!Number.isInteger(r))throw new Error("Bad Argument");return this.baseURL+"crimes-at-location"+this.queryString(["location","date"],[r,t])},crimesAround(r,t=this.lastUpdated){if(!r)throw new Error("Missing Argument");if(!Array.isArray(r))throw new Error("Bad Argument");return this.baseURL+"crimes-at-location"+this.queryString(["coords","date"],[r,t])},crimesNoLocation(r,t,e=this.lastUpdated){if(!r)throw new Error("Missing Argument");if(!this.crimeCategories[r])throw new Error("Bad Argument");if(!t)throw new Error("Missing Argument");if(!this.teams[t])throw new Error("Bad Argument");return this.baseURL+"crimes-no-location"+this.queryString(["category","force","date"],[r,t,e])},crimeCategories(r=this.lastUpdated){return this.baseURL+`crime-categories${this.queryString(["date"],[r])}`}};crimeCategories={};teams={};lastUpdated="2021-07";queryString(r,t){if(!r||!t)throw new Error("Missing Argument");if(!Array.isArray(r)||!Array.isArray(t))throw new Error("Bad Argument");let e="?";for(let s=0;s<t.length;s++)switch(r[s]){case"category":e+=`category=${t[s]}&`;break;case"force":e+=`force=${t[s]}&`;break;case"location":e+=`location_id=${t[s]}&`;break;case"coords":e+=`lat=${t[s][0]}&lng=${t[s][1]}&`;break;case"date":if(t[s]){let r=new Date(t[s]);if(r.valueOf()){let t=r.getMonth()>=9?r.getMonth()+1:`0${r.getMonth()+1}`;e+=`date=${r.getFullYear()}-${t}&`}}break;case"poly":let r="",i=t[s];if(Array.isArray(i)&&i.forEach((t=>{Array.isArray(t)&&(r+=`${t[0]},${t[1]}:`)})),r=r.substring(0,r.length-1),r.length>3e3)throw new Error("Too long polygon. Use POST request.");e+=r?`poly=${r}&`:""}return e.substring(0,e.length-1)}}{constructor(r){super(r),this.urls.forces=this.urls.forces.bind(this),this.urls.neighbourhoods=this.urls.neighbourhoods.bind(this),this.urls.force=this.urls.force.bind(this),this.urls.neighbourhood=this.urls.neighbourhood.bind(this),this.urls.officers=this.urls.officers.bind(this),this.urls.crimesAtPoint=this.urls.crimesAtPoint.bind(this),this.urls.outcomesAround=this.urls.outcomesAround.bind(this),this.urls.outcomesAtLocation=this.urls.outcomesAtLocation.bind(this),this.urls.outcomeForCrime=this.urls.outcomeForCrime.bind(this),this.urls.crimesAtLocation=this.urls.crimesAtLocation.bind(this),this.urls.crimesAround=this.urls.crimesAround.bind(this),this.urls.crimesNoLocation=this.urls.crimesNoLocation.bind(this),this.urls.crimeCategories=this.urls.crimeCategories.bind(this)}forces(r){this.get(this.urls.forces(),r)}__setForces(){this.teams||this.forces((r=>{if(Array.isArray(r))for(let t=0;t<r.length;t++){let e={};e[r[t].id]=r[t].name,Object.assign(this.teams,e)}}))}neibourhoods(r,t){this.get(this.urls.neighbourhoods(r),t)}force(r,t){this.__setForces(),this.get(this.urls.force(r),t)}neighbourhood(r,t,e){this.get(this.urls.neighbourhood(r,t),e)}__setCategories(){this.crimeCategories||this.crimeCategories(this.lastUpdated,(r=>{if(Array.isArray(r))for(let t=0;t<r.length;t++){let e={};e[r[t].url]=r[t].name,Object.assign(this.crimeCategories,e)}}))}crimeCategories(r,t){this.get(this.urls.crimeCategories(r),t)}}})();