import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authenticationReq } from '../../../models/authenticationReq';
import {lastValueFrom} from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { authenticationRes } from '../../../models/authenticationRes';
import { ApiResponse } from '../../../models/ApiResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginReq!:authenticationReq;

  constructor(private authenticationService:AuthenticationService) {}

  async loginFunction(request:authenticationReq){
    try{
      let res:ApiResponse<authenticationRes> = await lastValueFrom(this.authenticationService.login(request));
      this.loginReq = res.data;
    }
    catch(error){
      console.log(error);
    }
  }
}