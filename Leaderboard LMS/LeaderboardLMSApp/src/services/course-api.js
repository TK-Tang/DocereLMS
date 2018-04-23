import "whatwg-fetch"

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

var course_api = {
    getCourse(course_id){
        var url = api_domain + "/course/" + course_id;
        var req = {
            method: "GET"
        };

        return fetch(url, req).then(function(res) { console.log(res); res.json()});
    }
}

export default course_api;