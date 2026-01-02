"use strict";

module.exports = {
    authenticate() {
        const { username, password } = this.req.body;
        const authenticate = this.service.auth.authenticate(username, password);
        if (!authenticate) throw new Error("Authentication failed!");

        this.req.session.loggedin = true;
        this.res.send();
    },
};
