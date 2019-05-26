import { EventService } from "./../../services/event.service";
import { RegisterService } from "./../../services/register.service";
import { Component, OnInit } from "@angular/core";
import { Router, Event } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import {
  AlertService,
  UserService,
  AuthenticationService
} from "../../services";
import { User, EventVU, RegistrationVU } from "src/app/models";
import { Subscription } from "rxjs";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {
  user: User = new User();
  event: EventVU = new EventVU();
  settingsForm: FormGroup;
  errors: Object = {};
  p: number = 1;
  isSubmitting: boolean = false;
  users: User[] = [];
  events: EventVU[] = [];
  registrations: RegistrationVU[] = [];
  registration: RegistrationVU;
  currentUser: User;
  currentUserSubscription: Subscription;
  isRegistered: boolean;

  constructor(
    private eventService: EventService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    // create form group using the form builder
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }
  ngOnInit() {
    this.loadAllEvents();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteEvent(id: number) {
    if (window.confirm("Are sure you want to delete this item ?")) {
      this.eventService
        .delete(id)
        .pipe(first())
        .subscribe(() => {
          this.loadAllEvents();
        });
    }
  }

  public openEvent(id: number) {
    this.router.navigateByUrl(`event/${id}`);
  }

  public editEvent(id: number) {
    this.router.navigateByUrl(`createEvent/${id}`);
  }

  private loadAllEvents() {
    this.eventService
      .getAll()
      .pipe(first())
      .subscribe(events => {
        this.events = events;
      });
  }
}
