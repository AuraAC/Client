// Helper class that holds the current token. Is required to be accessible outside React component tree.

class TokenStorage {
  private _accessToken: string = null;

  public get accessToken() {
    return this._accessToken;
  }

  public set accessToken(token: string) {
    this._accessToken = token;

    // setTimeout(() => {
    //   this._accessToken = 'invalid-token';
    // }, 5000);
  }

  public clearToken() {
    this._accessToken = null;
  }
}

export const tokenStorage = new TokenStorage();
