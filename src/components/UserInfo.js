export default class UserInfo {
    constructor(name, job, avatar) {
        this._name = name;
        this._job = job;
        this._avatar = avatar;
    }

    getUserInfo() {
        return {
        name: this._name.textContent,
        job: this._job.textContent
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.about;
        this._avatar.src = data.avatar;
    }

    setAvatar(data) {
        this._avatar.src = data.avatar
    }
}