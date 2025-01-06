import { Component } from '@angular/core';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [],
  templateUrl: './window.component.html',
  styleUrl: './window.component.css'
})
export class WindowComponent {

  showSnackbar(message: string): void {
    const snackbar = document.getElementById('snackbar');
    if (snackbar) {
      snackbar.textContent = message;
      snackbar.className = 'snackbar show';

      setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
      }, 3000); 
    }
  }

  validateForm(): boolean {
   
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    
    let isValid = true;

   
    if (!email.value) {
      this.showSnackbar('Email is required.');
      isValid = false;
    } else if (!this.validateEmail(email.value)) {
      this.showSnackbar('Please enter a valid email address.');
      isValid = false;
    }

   
    if (!password.value) {
      this.showSnackbar('Password is required.');
      isValid = false;
    } else if (password.value.length < 6) {
      this.showSnackbar('Password must be at least 6 characters long.');
      isValid = false;
    }

    return isValid; 
  }

  
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}

