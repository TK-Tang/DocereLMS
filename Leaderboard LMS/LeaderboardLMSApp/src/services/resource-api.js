import "whatwg-fetch";

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var resource_api = {
    get_resources(course_id, category_id){
        var url = api_domain + "/course/" + course_id + "/category/" + category_id + "/resources";

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    }
}

export default resource_api;