import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EventVU, User } from "../models";
import { Subscription } from "rxjs";
import { UserService, AuthenticationService } from ".";

@Injectable({ providedIn: "root" })
export class EventService {
  user: User = new User();
  users: User[] = [];
  currentUser: User;
  currentUserSubscription: Subscription;
  uri = "http://localhost:44315/api";
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  getAll() {
    return this.http.get<EventVU[]>(`${this.uri}/events`);
  }

  getById(id: number) {
    return this.http.get(`${this.uri}/events/` + id);
  }

  addComment(id: number, text: string) {
    const comment = {
      userId: this.authService.currentUserValue.id,
      eventId: id,
      text
    };
    return this.http.post(`${this.uri}/Comments/`, comment);
  }

  getComments(id: number) {
    return this.http.get(`${this.uri}/Comments/${id}`);
  }

  register(event: EventVU) {
    console.log(event);
    return this.http.post(`${this.uri}/events/`, event);
  }

  update(event: EventVU) {
    return this.http.put(`${this.uri}/events/${event.id}`, event);
  }

  delete(id: number) {
    return this.http.delete(`${this.uri}/events/` + id);
  }
}
