const axios = require('axios');

class Populator {
    constructor(config) {
        this.requests = Object.keys(config)['requests'];
        this.url = Object.keys(config)['url'];
        if (token.length < 1) {
            this.auth = Object.keys(config)['auth'];
        } else {
            this.token = Object.keys(config)['token'];
            this.auth = true;
        }
        this.dummyData = Object.keys(config)['dummyData'];
    }

    populate() {
        if (this.auth) {
            for (let i = 0; i < numOfReqs; i++) {
                axios({
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    },
                    url: this.url,
                    data: i.toString() + this.dummyData
                });
            }
        } else {
            for (let i = 0; i < numOfReqs; i++) {
                axios({
                    method: 'post',
                    url: this.url,
                    data: i.toString() + this.dummyData
                });
            }
        }
    }
}

const config = {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI1ZjE1Zjk4Y2JmZTRjOTY2ODgyNDNlZmEiLCJpc0Zvb2RQcm92aWRlciI6ZmFsc2UsImlhdCI6MTU5NTI3NjM1MiwiZXhwIjoxNTk1Mjg3MTUyfQ.Ojg5M4gl5txg7aM-rbCKCrRQFawY6GvL9UB_2xuankM',
    url = 'http://localhost:8080/api/users/register/',
    requests = 10,
    auth = false,
    dummyData = {
        username: 'jeff',
        realName: 'jeffBezos',
        password: 'secretPassword',
        email: 'jeff.bezos@area51.gov',
        isFoodProvider: false
    }
}

const populator = new Populator(config)
populator.populate();