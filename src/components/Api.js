export default class Api {
  constructor ({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfo () {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }

  getInitialCards () {
    return this._request(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    });
  }

  setUserInfo (data) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  addCard (data) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  deleteCard (cardID) {
    return this._request(`${this._url}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  setLike (cardID) {
    return this._request(`${this._url}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  deleteLike (cardID) {
    return this._request(`${this._url}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  updateAvatar (data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
  }

  _request (url, options) {
    return fetch(url, options).then(this._checkServerResponse);
  }

  _checkServerResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }
}
