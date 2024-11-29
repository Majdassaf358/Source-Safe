import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ProfileComponent } from './components/authentication/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'groups',
    component: GroupsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
