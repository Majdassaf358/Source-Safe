import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ProfileComponent } from './components/authentication/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { FilesComponent } from './components/files/files.component';
import { InvitesComponent } from './components/invites/invites.component';

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
    path: 'groups/users/:groupName',
    component: UsersComponent,
  },
  {
    path: 'groups/users/:groupName',
    component: UsersComponent,
  },
  {
    path: 'groups/files/:groupName',
    component: FilesComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'invites',
    component: InvitesComponent,
  },
  // {
  //   path: 'users',
  //   component: UsersComponent,
  // },
];
