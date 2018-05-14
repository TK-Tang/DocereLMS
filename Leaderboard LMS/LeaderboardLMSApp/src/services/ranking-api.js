import "whatwg-fetch";

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var ranking_api = {
    get_ranking(course_id, ranking_id){
        var url = api_domain + "/course/" + course_id + "/ranking/" + ranking_d;

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    put_ranking(course_id, leaderboard_id, rankingInfo){
        var url = api_domain + "/course/" + course_id + "/leaderboard/" + leaderboard_id + "/ranking";

        let body = {
            "note": rankingInfo.note,
            "mark": rankingInfo.mark
        };

        var req = {
            method: "PUT",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    }
} 