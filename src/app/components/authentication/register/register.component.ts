import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authenticationReq } from '../../../models/authenticationReq';
import { AuthenticationService } from '../../../services/authentication.service';
import {lastValueFrom} from 'rxjs';
import { ApiResponse } from '../../../models/ApiResponse';
import { authenticationRes } from '../../../models/authenticationRes';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerReq:authenticationReq = new authenticationReq;

  constructor(private authenticationService:AuthenticationService) {}

  async registerFunction(request:authenticationReq){
    try{
      let res:ApiResponse<authenticationRes> = await lastValueFrom(this.authenticationService.register(request));
      this.registerReq = res.data;
      console.log('true')
    }
    catch(error){
      console.log(error);
    }
  }
}
