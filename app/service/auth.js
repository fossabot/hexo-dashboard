import request from "@/request";

export default {
    authenticate({ username, password }) {
        return request.post("auth", { username, password });
    },
};