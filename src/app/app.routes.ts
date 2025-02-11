import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ProfileComponent } from './components/authentication/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { FilesComponent } from './components/files/files.component';
import { InvitesComponent } from './components/invites/invites.component';
import { WindowComponent } from './components/shared/window/window.component';
import { FileChangesComponent } from './components/file-changes/file-changes.component';
import { FileContentComponent } from './components/file-content/file-content.component';

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
    path: 'groups/:allOrMy',
    component: GroupsComponent,
  },
  {
    path: 'users/:groupName',
    component: UsersComponent,
  },
  {
    path: 'groups/files/:groupName',
    component: FilesComponent,
  },
  {
    path: 'groups/files/:groupName/changes/:fileID',
    component: FileChangesComponent,
  },
  {
    path: 'groups/files/:groupName/content/:fileID',
    component: FileContentComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'invites',
    component: InvitesComponent,
  },
  {
    path: 'window',
    component: WindowComponent,
  },
  // {
  //   path: 'users',
  //   component: UsersComponent,
  // },
];
