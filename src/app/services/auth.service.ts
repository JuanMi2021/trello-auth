import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from '@services/token.service';
import { ResponseLogin } from '@models/auth.model';
import { User } from '@models/users.model';
import { BehaviorSubject } from 'rxjs';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  getDataUser(){
    return this.user$.getValue();
  }

  login(email: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, {
      email,
      password
    }
    )
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
      })
    );

  }
  register(email: string, password: string, name: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      email,
      password,
      name
    });
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(`${this.apiUrl}/api/v1/auth/is-available`, {
      email
    });
  }
  registerAndLogin(email: string, password: string, name: string) {
    return this.register(email, password, name)
      .pipe(
        switchMap(() => this.login(email, password))
      )
  }

  recovery(email:string){
    return this.http.post<{ isAvailable: boolean }>(`${this.apiUrl}/api/v1/auth/recovery`, {
      email
    });
  }
changePassword(token:string, newPassword:string){
  return this.http.post<{ isAvailable: boolean }>(`${this.apiUrl}/api/v1/auth/change-password`, {
    token,
    newPassword
  });
}

logout(){
  this.tokenService.removeToken();
}

getProfile(){
  return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`,{context: checkToken()})
  .pipe(
    tap(user => {
      this.user$.next(user);
    })
  );

}


}
