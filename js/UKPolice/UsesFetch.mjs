export class UsesFetch {
    async sendRequest(url, init = this.init) {
        this.init = {};
        fetch(url, init)
            .then(function(response) {
                if(!response.ok) {
                    throw new Error('HTTP ERROR: ' + response.status);
                }
                return response.json();
            })
            .then(this.handleResponse);
    }

    handleResponse(response) {
        if(this.handleStatus(response.status)) {
            return response.body ? response.body : 'No results.';
        } else return 'No contents.';
    }

    handleStatus(status) {
        switch(status) {
            case 200:
                return true;
                break;
            case 404:
                return false;
                break;
            case 503:
                throw new Error('Too many results!');
                break;
        }
    }

    __init = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: ''
    }
    init = {};

    get init() {
        return Object.assign({}, this.__init, this.init);
    }

    set setRequestBody(data) {
        this.init.body = JSON.stringify(data);
    }

    setInit(newInitObject) {
        Object.assign(this.init, newInitObject);
    }

}