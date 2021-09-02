export class UsesFetch {
    setRequestBody(data) {
        this.init.body = JSON.stringify(data);
    }

    get(url, callback) {
        let init = null;
        if(this.init === {}) {
            init = Object.assign({}, this.__init, this.init);
        }
        
        this.init = {};
        this.sendRequest(url, init, callback);
    }
    
    async sendRequest(url, init, callback) {
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
        return response ? response : 'No results.';
    }

    __init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: ''
    }
    init = {};

    get init() {
        console.log()
        return Object.assign({}, this.__init, this.init);
    }
    set init(newInitObject) {
        this.init = newInitObject == false ? this.init.merge(newInitObject) : {};
    }

}