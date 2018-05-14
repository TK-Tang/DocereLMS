import "whatwg-fetch";

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var ranking_section_api = {
    get_rankingAllSections(course_id, leaderboard_id){
        var url = api_domain + "/course/" + course_id + "/leaderboard/" + leaderboard_id + "/rankingsection";

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    put_rankingSection(course_id, leaderboard_id, rankingSectionInfo){
        var url = api_domain + "/course/" + course_id + "/leaderboard/" + leaderboard_id + "/rankingsection";

        let body = {
            "name": rankingSectionInfo.name
        };

        var req = {
            method: "PUT",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        };

        return fetch(url, req).then((res) => res.json());
    },

    post_rankingSection(course_id, leaderboard_id, ranking_section_id, rankingSectionInfo){
        var url = api_domain + "/course/" + course_id + "/leaderboard/" + leaderboard_id + "/rankingsection/" + ranking_section_id;

        let body = {
            "name": rankingSectionInfo.name
        };

        var req = {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        };

        return fetch(url, req).then((res) => res.json());
    },

    delete_rankingSection(){
        var url = api_domain + "/course/" + course_id + "/leaderboard/" + leaderboard_id + "/rankingsection/" + ranking_section_id;

        var req = {
            method: "DELETE",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    }
}

export default ranking_section_api;