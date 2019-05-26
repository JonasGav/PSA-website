import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models";
import { UserService, AuthenticationService } from "../../services";
import { first } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "user-settings-page",
  templateUrl: "./user-settings.component.html"
})
export class UserSettingsComponent implements OnInit {
  user: User = new User();
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting: boolean = false;
  users: User[] = [];
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      username: "",
      email: "",
      password: ""
    });
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
    (<any>Object).assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
    this.loadAllUsers();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.loadAllUsers();
        this.router.navigate(["/login"]);
      });
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    /*this.userService.update(this.user).subscribe(
      updatedUser =>
        this.router.navigateByUrl("/profile/" + updatedUser.username),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );*/
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }

  updateUser(values: Object) {
    (<any>Object).assign(this.user, values);
  }
}
