export class UsesFetch {
    setRequestBody(data) {
        this.init.body = JSON.stringify(data);
    }
    setRequestMethod(method) {
        this.init.method = method;
    }

    get(url, callback) {
        let init = this.init;
        this.init = false;
        this.sendRequest(url, init, callback);
    }
    
    async sendRequest(url, init = this.init, callback) {
        fetch(url, init)
            .then(function(response) {
                if(!response.ok) {
                    throw new Error('HTTP ERROR: ' + response.status);
                }
                return response.json();
            })
            .then((response) => {
                callback(this.handleResponse(response));
            });
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
    set init(newInitObject) {
        this.init = newInitObject ? this.init.merge(newInitObject) : {};
    }

}