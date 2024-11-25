import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from './services/direction.service';
import { DarkService } from './services/dark.service';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  mode: boolean;

  constructor(
    private translateService: TranslateService,
    private diectionService: DirectionService,
    private darkservice: DarkService
  ) {
    // this.translateService.setDefaultLang('en');
    // this.translateService.use(localStorage.getItem('language') || 'en');
    const storedValue = localStorage.getItem('mode');
    this.mode = storedValue ? JSON.parse(storedValue) : false;
  }

  ngOnInit() {
    // this.diectionService.toggleExternalStyles(
    //   localStorage.getItem('language') || 'en'
    // );
    this.darkservice.changeMode(this.mode);
  }
  title = 'Source_Safe';
}
