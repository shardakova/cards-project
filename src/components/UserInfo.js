export default class UserInfo {
  constructor({name, job}) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    }
  }

  setUserInfo(obj) {
    this._name.textContent = obj.name;
    this._job.textContent = obj.job;
  }
}
