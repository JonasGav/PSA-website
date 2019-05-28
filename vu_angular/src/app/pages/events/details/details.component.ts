import { UserService } from "./../../../services/user.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "src/app/services/event.service";
import { share } from "rxjs/operators";
import {
  RegisterService,
  AuthenticationService,
  AlertService
} from "../../../services";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  id: number;
  event$: any;
  comments$: any;
  registrations$: any;
  newComment: string;
  users$: any;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventService,
    private userService: UserService,
    private registerService: RegisterService,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.route.params.subscribe(params => {
      this.id = Number(params.id);
    });
  }

  ngOnInit() {
    if (this.id) {
      this.event$ = this.eventsService.getById(this.id);
      this.comments$ = this.eventsService.getComments(this.id);
      this.users$ = this.userService.getAll();
      this.registrations$ = this.registerService.getById(this.id);
    }
  }

  registerToEvent() {
    this.registerService
      .register(this.id, this.authService.currentUserValue.id)
      .subscribe(res => {
        this.registrations$ = this.registerService.getById(this.id);
      });
  }

  unRegisterToEvent(registrations) {
    this.registerService
      .delete(this.id, this.authService.currentUserValue.id, registrations)
      .subscribe(res => {
        this.registrations$ = this.registerService.getById(this.id);
      });
  }

  addComment() {
    if (this.newComment) {
      if (this.newComment.length < 50) {
        if (this.newComment.length > 5) {
          this.eventsService
            .addComment(this.id, this.newComment)
            .subscribe(res => {
              this.comments$ = this.eventsService.getComments(this.id);
              console.log(this.eventsService.getComments(this.id));
              this.newComment = undefined;
            });
        } else {
          this.alertService.error("Comment too short");
        }
      } else {
        this.alertService.error("Comment too long");
      }
    }
  }

  alreadyRegistered(registrations): boolean {
    const length = registrations.filter(
      reg => reg.userId === this.authService.currentUserValue.id
    ).length;
    return length > 0;
  }
}
