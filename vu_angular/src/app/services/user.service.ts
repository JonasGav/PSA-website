import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models";
import { Subscription } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  currentUser: User;
  currentUserSubscription: Subscription;
  authenticationService: any;
  uri = "http://localhost:44315/api";
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${this.uri}/User/`);
  }

  getById(id: number) {
    return this.http.get(`${this.uri}/User/` + id);
  }

  register(user: User) {
    return this.http.post(`${this.uri}/User/`, user);
  }

  update(user: User) {
    return this.http.put(`${this.uri}/User/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.uri}/User/` + id);
  }
  getCurrentUser() {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
    return this.currentUser;
  }
}
