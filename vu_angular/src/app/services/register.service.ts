import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EventVU, User, RegistrationVU } from "../models";
import { Subscription } from "rxjs";
import { UserService, AuthenticationService } from ".";
import { registerContentQuery } from "@angular/core/src/render3";
import { filter, map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class RegisterService {
  user: User = new User();
  registrationvu: RegistrationVU = new RegistrationVU();
  users: User[] = [];
  currentUser: User;
  currentUserSubscription: Subscription;
  uri = "http://localhost:44315/api";
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<RegistrationVU[]>(`${this.uri}/Registrations`);
  }

  getById(id: number) {
    return this.http
      .get<RegistrationVU[]>(`${this.uri}/Registrations`)
      .pipe(
        map((response: any) => response.filter(item => item["eventId"] === id))
      );
  }

  // getById(id: number) {
  //   return this.http.get(`${this.uri}/Registrations/` + id);
  // }
  // getByKeys(eventUserId: number[]) {
  //   return this.http.get(`${this.uri}/Registrations/` + eventUserId);
  // }

  register(eventId: number, userid: number) {
    this.registrationvu.eventId = eventId;
    this.registrationvu.userId = userid;
    console.log(this.registrationvu);
    return this.http.post(`${this.uri}/Registrations/`, this.registrationvu);
  }

  delete(eventId: number, userid: number, registrations: RegistrationVU[]) {
    var target = registrations.find(
      x => x.eventId == eventId && x.userId == userid
    );
    return this.http.delete(`${this.uri}/Registrations/` + target.id);
  }
}
