import { CreateEventComponent } from "./pages/create-event/create-event.component";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./pages/home";
import { LoginComponent } from "./pages/login";
import { RegisterComponent } from "./pages/register";
import { AuthGuard } from "./guards";
import { UserSettingsComponent } from "./pages/user-settings/user-settings.component";
import { EventsComponent } from "./pages/events/events.component";
import { DetailsComponent } from './pages/events/details/details.component';

const appRoutes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "createEvent",
    component: CreateEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "createEvent/:id",
    component: CreateEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "settings",
    component: UserSettingsComponent,
    canActivate: [AuthGuard]
  },
  { path: "events", component: EventsComponent },
  { path: "event/:id", component: DetailsComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "events" }
];

export const routing = RouterModule.forRoot(appRoutes);
