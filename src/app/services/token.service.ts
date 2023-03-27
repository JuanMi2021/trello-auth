import { Injectable } from '@angular/core';
import { setCookie, removeCookie,getCookie } from 'typescript-cookie';

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
}