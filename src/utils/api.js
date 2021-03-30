class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAuthorizedUserInfo() {
    return this._makeRequest({
      action: '/users/me'
    }).then(this._getJsonFromResponse);
  }

  getCards() {
    return this._makeRequest({
      action: '/cards',
    }).then(this._getJsonFromResponse);
  }

  updateProfile({name, about}) {
    return this._makeRequest({
      action: '/users/me',
      method: 'PATCH',
      data: {name, about},
    }).then(this._getJsonFromResponse);
  }

  addCard({name, link}) {
    return this._makeRequest({
      action: '/cards',
      method: 'POST',
      data: {name, link},
    }).then(this._getJsonFromResponse);
  }

  removeCard(cardId) {
    return this._makeRequest({
      action: `/cards/${cardId}`,
      method: 'DELETE',
    }).then(this._getOkStatusFromResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked
      ? this.removeLikeFromCard(cardId)
      : this.likeCard(cardId);
  }

  likeCard(cardId) {
    return this._makeRequest({
      action: `/cards/likes/${cardId}`,
      method: 'PUT',
    }).then(this._getJsonFromResponse);
  }

  removeLikeFromCard(cardId) {
    return this._makeRequest({
      action: `/cards/likes/${cardId}`,
      method: 'DELETE',
    }).then(this._getJsonFromResponse);
  }

  updateAvatar(avatar) {
    return this._makeRequest({
      action: `/users/me/avatar`,
      method: 'PATCH',
      data: {avatar}
    }).then(this._getJsonFromResponse);
  }

  _makeRequest({
    action,
    method = 'GET',
    data = null,
  }) {
    if (!action) {
      return Promise.reject('Не передано адреса запроса');
    }

    const requestParams = {
      method,
      headers: this._headers,
    };

    let url = this._baseUrl + action;

    if (data) {
      if (method === 'GET') {
        url += new URLSearchParams(data).toString();
      } else {
        requestParams.body = JSON.stringify(data);
      }
    }

    return fetch(url, requestParams);
  }

  _getJsonFromResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }

    return response.json();
  }

  _getOkStatusFromResponse(response) {
    return response.ok || Promise.reject(`Ошибка: ${response.status}`);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: 'ae67ccb6-ec53-41ab-bfce-d685e4f66069',
    'Content-Type': 'application/json'
  }
});
