import { Injectable } from '@angular/core';
import { setCookie, removeCookie,getCookie } from 'typescript-cookie';

import jwt_decode, { JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  saveToken(token: string){
    // localStorage.setItem('token', token);
    // sessionStorage.setItem('token', token);
    setCookie('token-trello', token, { expires: 365, path: '/' });
  }

  getToken(){
    // const token = localStorage.getItem('token');
    // const token = sessionStorage.getItem('token');
    const token = getCookie ('token-trello');
    return token;
  }

  removeToken(){
    // localStorage.removeItem('token');
    removeCookie('token-trello');
  }

  isValidToken(){
    const token = this.getToken();
    if (!token){
      return false
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp){
      const tokenDate = new Date (0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date ();
      return tokenDate.getTime()> today.getTime();
    }
    return false
  }
}
