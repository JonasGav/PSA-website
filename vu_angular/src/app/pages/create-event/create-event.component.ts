import { EventService } from "./../../services/event.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import {
  AlertService,
  UserService,
  AuthenticationService
} from "../../services";
import { User } from "src/app/models";
import { Subscription } from "rxjs";

@Component({
  templateUrl: "./create-event.component.html"
})
export class CreateEventComponent implements OnInit {
  id: number;
  user: User = new User();
  EventForm: FormGroup;
  loading = false;
  submitted = false;
  users: User[] = [];
  currentUser: User;
  currentUserSubscription: Subscription;
  eventSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private eventService: EventService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params.id) this.id = params.id;
    });
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
    // redirect to home if already logged in
  }
  ngOnInit() {
    this.EventForm = this.formBuilder.group({
      createdBy: [""],
      name: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      address: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      coordinates: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      description: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(50)]
      ],
      DateTime: [""],
      maxReservations: [""],
      minReservations: [""],
      duration: [""]
    });
    if (this.id) {
      this.eventSubscription = this.eventService
        .getById(this.id)
        .subscribe(event => {
          this.EventForm.patchValue(event);
        });
    }
  }
  get f() {
    return this.EventForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.f.address.errors);

    // stop here if form is invalid
    if (this.EventForm.invalid) {
      return;
    }

    this.loading = true;
    if (!this.id) {
      this.EventForm.value["UserId"] = this.currentUser.id;
      this.eventService
        .register(this.EventForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Creation successful", true);
            this.router.navigate(["/events"]);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    } else {
      const event = this.EventForm.value;
      Object.assign(event, { id: Number(this.id) });
      this.eventService
        .update(event)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Creation successful", true);
            this.router.navigate(["/home"]);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    }
  }
}
