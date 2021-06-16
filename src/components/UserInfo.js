import {inputName, inputJob} from "../utils/constants.js"

export const userInfo = {};
export default class UserInfo {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        userInfo.name = this._name.textContent;
        userInfo.job = this._job.textContent;
        return userInfo;
    }

    setUserInfo() {
        this._name.textContent = inputName.value;
        this._job.textContent = inputJob.value;
    }
}