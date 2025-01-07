import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { authenticationReq } from '../../../models/authenticationReq';
import { AuthenticationService } from '../../../services/authentication.service';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../../../models/ApiResponse';
import { authenticationRes } from '../../../models/authenticationRes';
import { Router } from '@angular/router';
import { register } from '../../../models/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerReq: authenticationReq = new authenticationReq();
  registerForm!: FormGroup;
  token: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  async registerFunction() {
    var req: register = this.registerForm.getRawValue();
    try {
      let res: ApiResponse<authenticationRes> = await lastValueFrom(
        this.authenticationService.register(req)
      );
      this.registerReq = res.data;
      this.token = res.data.token || '';
      localStorage.setItem('Token', this.token);
      this.router.navigate(['/groups','all']);
    } catch (error) {
      console.log(error);
    }
  }
}
