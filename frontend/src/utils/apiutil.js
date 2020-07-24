import Cookies from 'universal-cookie';

const cookies = new Cookies();

function sendReq(url, options, onAuth, onFail){
    fetch(url, options)
        .then(async res => {
            var data = await res.json().catch(err => console.log("data: `" + data + "` err: " + err));
            console.log(data + "\n" + res)
            switch(res.status){
                case 500: // Invalid/Auth failed
                case 403:
                case 401:
                case 400:
                    console.log(res.status);
                    onFail(data.error.message || ((data.error.toString() == "[object Object]") ? JSON.stringify(data.error) : data.error));
                    break;
                case 201:
                case 200:
                    onAuth(data);
                    break;
                default:
                    onFail("Something went wrong while contacting the server!"); // Something went wrong
                    break;
            }
        })
}

const APIUtil = {
    isAuthenticated: () => typeof(cookies.get('token')) != "undefined",
    authenticate(data, cb) {
        sendReq("/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }, dataa => {
            const onehrdate = () => {var n = new Date(); n.setTime(n.getTime + (60*60*1000)); return n};
            cookies.set('token', dataa.token, { path: '/', expires: onehrdate()}); // Token will expire in 1 hour
            this.userData = JSON.parse(atob(dataa.token.split(".")[1]));
            cb(1);
        }, error => {
            cb(0, error);
        });
    },
    registerUser(data, cb) {
        sendReq("/api/users/register", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }, dataa => {
            cb(1);
        }, error => {
            cb(0, error);
        });
    },
    logout(cb) {
        cookies.remove('token');
        cb();
    },
    getSelfInfo(cb){
        sendReq("/api/users/me", {
            headers: {"Authorization": "Bearer " + cookies.get('token')}
        }, data => {
            cb(1, data);
        }, error => {
            cb(0, error);
        })
    },
    getLocationsFromPosition(dataa, cb) {
        // https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
        sendReq("/api/locations/near?" + new URLSearchParams(dataa).toString(), {
            headers: {"Authorization": "Bearer " + cookies.get('token')}
        }, data => {
            cb(1, data);
        }, error => {
            cb(0, [{name: "Couldn't find locations"}]);
            console.error(error)
        });
    },
    getAllLocations(cb) {
        // https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
        sendReq("/api/locations/all", {
            headers: {"Authorization": "Bearer " + cookies.get('token')}
        }, data => {
            cb(1, data);
        }, error => {
            cb(0, [{name: "Couldn't find locations"}]);
            console.error(error)
        });
    },
    getUserInformation(userId, cb) {
        sendReq("/api/users/" + userId, {
            headers: {"Authorization": "Bearer " + cookies.get('token')}
        }, data => {
            cb(1, data);
        }, error => {
            cb(0, [{name: "Couldn't find user"}]);
            console.error(error)
        });
    }
};

export default APIUtil;