import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { take } from 'rxjs';
import { User } from '../Entity/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private baseUrl = environment.BASE_URL || '/api';

  constructor(private _http: HttpClient) {}

  getAllUsers() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      // uid: userId,
    });

    return this._http
      .get<User[]>(`${environment.API}/user/all`, { headers })
      .pipe(take(1));
  }

  update(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      // uid: userId,
    });

    const options = {
      headers: headers,
    };

    return this._http
      .put<User>(`${environment.API}/user/update`, user, options)
      .pipe(take(1));
  }

  deleteUser(userId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      // uid: userId,
    });

    return this._http
      .delete<User>(`${environment.API}/user/delete/${userId}`, { headers })
      .pipe(take(1));
  }
}
