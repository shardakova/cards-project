export default class UserInfo {
  constructor ({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo () {
    return {
      _id: this._id,
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo ({ _id, name, about, avatar }) {
    this._id = _id;
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }
}
