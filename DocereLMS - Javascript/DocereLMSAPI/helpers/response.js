function success(data){
    return {
        status: "success",
        payload: data
    };
}

function error(data){
    return {
        status: "error",
        payload: data
    };
}

function fail(data){
    return {
        status: "fail",
        payload: data
    };
}

module.exports = {
    success,
    error,
    fail
};