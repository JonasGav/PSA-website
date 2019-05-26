import { Component, OnInit } from "@angular/core";
import { EventVU, User, RegistrationVU } from "src/app/models";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { RegisterService, AuthenticationService } from "src/app/services";

@Component({
  selector: "app-event-det",
  templateUrl: "./event-det.component.html",
  styleUrls: ["./event-det.component.scss"]
})
export class EventDetComponent implements OnInit {
  user: User = new User();
  event: EventVU = new EventVU();
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting: boolean = false;
  users: User[] = [];
  events: EventVU[] = [];
  registrations: RegistrationVU[] = [];
  registration: RegistrationVU;
  currentUser: User;
  currentUserSubscription: Subscription;
  isRegistered: boolean;
  constructor(
    private registerService: RegisterService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit() {}

  deleteRegistration(id: number, userId: number) {
    this.registerService
      .delete(id, userId, this.registrations)
      .pipe(first())
      .subscribe(() => {
        this.loadAllRegistrations();
      });
  }
  registerEvent(id: number, userId: number) {
    this.registerService
      .register(id, userId)
      .pipe(first())
      .subscribe(() => {
        this.loadAllRegistrations();
      });
  }
  private loadAllRegistrations() {
    this.registerService
      .getAll()
      .pipe(first())
      .subscribe(registrations => {
        this.registrations = registrations;
      });
  }
}
