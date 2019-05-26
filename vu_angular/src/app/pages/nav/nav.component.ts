import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models";
import { UserService, AuthenticationService } from "src/app/services";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit() {}
  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
