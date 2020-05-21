import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USER_ID = 'User_Id';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_ID);
    window.localStorage.clear();
  }

  public saveToken(token: string, user: object) {
    if (!token || !user) return;
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,  token);
    window.localStorage.removeItem(USER_ID);
    window.localStorage.setItem(USER_ID,  user._id);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
}