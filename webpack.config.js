module.exports = function (env){
    return {
        resolve: {
            fallback: {
                "fs": false,
                "path": false,
                "os": false
            }
        }
    }
}