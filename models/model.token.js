export default class Token {
    constructor({
        user = "",
        refreshToken = "",
        accessToken = ""
    } = {}) {
        this.user = user;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
    }
}