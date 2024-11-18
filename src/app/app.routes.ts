import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'register',
        pathMatch:'full',
    },
    {
        path: 'login',
        component:LoginComponent,
    },
    {
        path: 'register',
        component:RegisterComponent,
    },
];


