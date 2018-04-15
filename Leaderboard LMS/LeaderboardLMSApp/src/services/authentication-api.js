import React from "react";
import "whatwg-fetch"

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

var authentication_api = {
    signin(userInfo){
        var url = api_domain + "/auth/signin"
        let headers = {
            "Content-Type": "application/json"
        };

        let body = {
            "email": userInfo.email,
            "password": userInfo.password
        }

        var req = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        };

        return fetch(url, req).then((res) => res.json());
    }
}

module.exports = authentication_api;