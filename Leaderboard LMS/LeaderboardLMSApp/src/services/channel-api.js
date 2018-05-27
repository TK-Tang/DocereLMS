import "whatwg-fetch";

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var channel_api = {
    get_channel(course_id, channel_id){
        var url = api_domain + "/course/" + course_id + "/channel/" + channel_id;

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    }
}

export default channel_api;