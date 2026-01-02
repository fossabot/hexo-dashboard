/* global hexo */
"use strict";

const path = require("path");
const session = require("express-session");
const serveStatic = require("serve-static");
const bodyParser = require("body-parser");
const connectQuery = require("connect-query");

const createRouter = require("./router");
const middleware = require("./middleware");

//todo: 后端所有接口都加上更严格的校验 比如防止重复创建文章 重复发布文章等等
hexo.extend.filter.register("server_middleware", function (app) {
    const adminRoot = hexo.config.root + "admin";
    const apiRoot = adminRoot + "/api";

    // main route
    app.use(adminRoot, serveStatic(path.join(__dirname, "../dist")));

    // params
    app.use(apiRoot, connectQuery());
    app.use(apiRoot, bodyParser.json({ "limit": "50mb" }));

    // helper
    app.use(apiRoot, middleware.helper);

    // auth
    if (hexo.config.admin) {
        app.use(apiRoot, session({
            "resave": false,
            "saveUninitialized": false,
            "secret": hexo.config.admin.secret,
        }));
        app.use(apiRoot, middleware.auth);
    }

    // api router
    app.use(apiRoot, createRouter(hexo));

    // error handler
    app.use(apiRoot, middleware.errorHandler);
});
