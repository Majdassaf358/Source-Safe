import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkService {
  constructor() {}

  changeMode(mode: boolean) {
    if (mode == true) {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach((link) => {
        if (link.getAttribute('href') === 'assets/dark.css') {
          link.remove();
        }
      });
    } else {
      const linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('type', 'text/css');
      linkElement.setAttribute('href', 'assets/dark.css');
      document.head.appendChild(linkElement);
    }
  }
}
