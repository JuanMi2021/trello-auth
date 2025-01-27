import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';
import { List, CreateListDto } from '@models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

create(dto: CreateListDto){
  return this.http.post<List>(`${this.apiUrl}/api/v1/lists/`,dto,{
    context: checkToken()
  })
}
}
