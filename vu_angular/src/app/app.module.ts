import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";

import { AlertComponent } from "./components";
import { JwtInterceptor, ErrorInterceptor } from "./helpers";
import { HomeComponent } from "./pages/home";
import { LoginComponent } from "./pages/login";
import { RegisterComponent } from "./pages/register";
import { NavComponent } from "./pages/nav/nav.component";
import { UserSettingsComponent } from "./pages/user-settings/user-settings.component";
import { CreateEventComponent } from "./pages/create-event/create-event.component";
import { EventsComponent } from "./pages/events/events.component";
import { EventDetComponent } from "./pages/event-det/event-det.component";
import { DetailsComponent } from "./pages/events/details/details.component";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    FormsModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    UserSettingsComponent,
    CreateEventComponent,
    EventsComponent,
    EventDetComponent,
    DetailsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
