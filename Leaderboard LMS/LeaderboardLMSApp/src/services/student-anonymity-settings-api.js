import "whatwg-fetch";

let domain = "http://localhost";
let port = "11000";
let api_domain = domain + ":" + port;

let headers = {
    "Content-Type": "application/json"
};

var student_anonymity_settings_api = {
    get_studentAnonymitySettings(course_id, ranking_id){
        var url = api_domain + "/course/" + course_id + "/ranking/" + ranking_id + "/studentanonymitysetting";

        var req = {
            method: "GET",
            headers: headers,
            credentials: "include"
        };

        return fetch(url, req).then((res) => res.json());
    },

    post_studentAnonymitySettings(course_id, ranking_id, studentAnonymitySettingInfo){
        var url = api_domain + "/course/" + course_id + "/ranking/" + ranking_id + "/studentanonymitysetting";

        let body = {
            "revealLeaderboardName": studentAnonymitySettingInfo.revealLeaderboardName,
            "revealRankingSections": studentAnonymitySettingInfo.revealRankingSections
        };

        var req = {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        };

        return fetch(url, req).then((res) => res.json());
    }
}

export default student_anonymity_settings_api;
