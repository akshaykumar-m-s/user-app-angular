import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../classes/user.class";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private _httpClient: HttpClient) {}

  getUserList(page: number): Observable<any> {
    const requestUrl = `/users?page=${page}`;

    return this._httpClient.get<any>(requestUrl);
  }

  getUserById(id: number): Observable<any> {
    return this._httpClient.get<any>(`/users/${id}`);
  }

  createUser(item: User): Observable<User> {
    const requestUrl = `/users`;

    return this._httpClient.post<User>(requestUrl, item);
  }

  updateUser(item: User): Observable<any> {
    const requestUrl = `/users/${item.id}`;

    return this._httpClient.put<any>(requestUrl, item);
  }

  deleteUser(id: number): Observable<any> {
    const requestUrl = `/users/${id}`;

    return this._httpClient.delete<any>(requestUrl);
  }
}
