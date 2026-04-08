import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { changePasswordObj, newUser, User, UserApiResponse } from '@app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}



  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getAllUsers`);
  }
  createNewUser(userData: newUser): Observable<UserApiResponse> {
    return this.http.post<UserApiResponse>(`${this.apiUrl}/createNewUser`, userData);
  }

  deleteUser(id: number): Observable<UserApiResponse> {
    return this.http.delete<UserApiResponse>(`${this.apiUrl}/deleteUser/${id}`);
  }

  changePassword(id: number, passwords: changePasswordObj): Observable<UserApiResponse> {
    return this.http.post<UserApiResponse>(`${this.apiUrl}/changePassword/${id}`, passwords);
  }
}
