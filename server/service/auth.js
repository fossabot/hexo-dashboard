"use strict";

const bcrypt = require("bcryptjs");

module.exports = class AuthService {
    constructor(hexo) {
        this.hexo = hexo;
    }

    // todo: username目前没用 给未来支持多用户做准备
    authenticate(username, password) {
        const hash = this.hexo.config.admin.password_hash;
        if (!bcrypt.compareSync(password, hash)) return false;
        return true;
    }
};
