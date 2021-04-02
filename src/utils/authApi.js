import IApi from './IApi';

class AuthApi extends IApi{
  signIn({email, password}) {
    return this._makeRequest({
      action: '/signin',
      method: 'POST',
      data: {email, password}
    }).then(this._getJsonFromResponse);
  }

  signUp({email, password}) {
    return this._makeRequest({
      action: '/signup',
      method: 'POST',
      data: {email, password}
    }).then(this._getJsonFromResponse);
  }

  getUserEmail() {
    return this._makeRequest({
      action: '/users/me',
    }).then(this._getJsonFromResponse);
  }
}

export const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});
