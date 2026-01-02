"use strict";

module.exports.helper = function (req, resp, next) {
    resp.send = function (data) {
        resp.setHeader("Content-Type", "application/json");

        const ret = { "msg": "Unknown error", "code": -1 };
        switch (typeof (data)) {
            case "string":
                ret.code = 1;
                ret.msg = data;
                break;
            case "undefined":
            case "object":
                ret.code = 0;
                ret.msg = "OK";
                ret.data = data;
                break;
            case "number":
                ret.code = data;
                ret.msg = "Error: " + data;
                break;
        }
        resp.end(JSON.stringify(ret));
    };
    next();
};

module.exports.auth = function (req, resp, next) {
    if (req.url.includes("/auth")) return next();
    if (req.session && req.session.loggedin) return next();
    resp.send(401);
};

module.exports.errorHandler = function (err, req, resp, next) {
    if (resp.headersSent) return next(err);
    resp.send(err.toString());
};
