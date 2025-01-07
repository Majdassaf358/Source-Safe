import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor() {}

    show(message: string) {
      const notification = document.createElement('div');
      notification.className = 'custom-snackbar';
      notification.innerText = message;
      document.body.appendChild(notification);
  
      setTimeout(() => {
        notification.classList.add('show');
      }, 100);
  
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    }
}