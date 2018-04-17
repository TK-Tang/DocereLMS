import "whatwg-fetch"

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

var authentication_api = {
    signin(loginInfo){
        var url = api_domain + "/auth/signin"
        let headers = {
            "Content-Type": "application/json"
        };

        let body = {
            "email": loginInfo.email,
            "password": loginInfo.password
        }

        var req = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    getCurrentUser(){
        var url = api_domain + "/auth/user"
        var req = {
            method: "GET",
            credentials: "include"
        }

        return fetch(url, req).then((res) => res.json());
    }
}

module.exports = authentication_api;