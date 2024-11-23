import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { authenticationReq } from '../../../models/authenticationReq';
import {lastValueFrom} from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { authenticationRes } from '../../../models/authenticationRes';
import { ApiResponse } from '../../../models/ApiResponse';
import { login } from '../../../models/login';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  loginReq:authenticationReq = new authenticationReq;
  loginForm!: FormGroup;
  constructor(private authenticationService:AuthenticationService,
    private fb: FormBuilder) {}
    ngOnInit(): void {
      this.loginForm = this.fb.group(
        {
          email: ['',Validators.required],
          password: ['',Validators.required],
        })
    }

  test(){
    console.log('form:', this.loginForm);
  }

  async loginFunction(){
    var req: login = this.loginForm.getRawValue();
    try{
      let res:ApiResponse<authenticationRes>  = await lastValueFrom(this.authenticationService.login(req));
      this.loginReq = res.data;
      console.log('true')
    }
    catch(error){
      console.log(error);
    }
  }
}