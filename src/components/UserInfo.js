export default class UserInfo {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        const userInformation = {};
        userInformation.name = this._name.textContent;
        userInformation.job = this._job.textContent;
        return userInformation;
    }

    setUserInfo({name, job}) {
        console.log(name, job);
        this._name.textContent = name;
        this._job.textContent = job;
    }
}