import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { authenticationReq } from '../../../models/authenticationReq';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { authenticationRes } from '../../../models/authenticationRes';
import { ApiResponse } from '../../../models/ApiResponse';
import { login } from '../../../models/login';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginReq: authenticationRes = new authenticationRes();
  token: string = '';
  loginForm!: FormGroup;
  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private messageService: MessagesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  showMessage(message: string) {
    this.messageService.show(message);
  }
  validateForm(): boolean {
   
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    
    let isValid = true;

   
    if (!email.value) {
      this.showMessage('Email is required.');
      isValid = false;
    } else if (!this.validateEmail(email.value)) {
      this.showMessage('Please enter a valid email address.');
      isValid = false;
    }

   
    if (!password.value) {
      this.showMessage('Password is required.');
      isValid = false;
    } else if (password.value.length < 6) {
      this.showMessage('Password must be at least 6 characters long.');
      isValid = false;
    }

    return isValid; 
  }

  
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  async loginFunction() {
    var req: login = this.loginForm.getRawValue();
    try {
      let res: ApiResponse<authenticationRes> = await lastValueFrom(
        this.authenticationService.login(req)
      );
      this.loginReq = res.data;
      this.token = res.data.token || '';
      localStorage.setItem('Token', this.token);
      this.router.navigate(['/groups','all']);
    } catch (error) {
      console.log(error);
    }
  }
}
