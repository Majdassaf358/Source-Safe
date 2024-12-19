import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DirectionService } from './services/direction.service';
import { DarkService } from './services/dark.service';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { InvitesService } from './services/invites.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  mode: boolean;

  constructor(
    private translateService: TranslateService,
    private diectionService: DirectionService,
    private darkservice: DarkService,
    private inviteService: InvitesService
  ) {
    this.translateService.addLangs(['ar', 'en']);
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('language') || 'en');
    const storedValue = localStorage.getItem('mode');
    this.mode = storedValue ? JSON.parse(storedValue) : false;
  }

  ngOnInit() {
    this.inviteService.fetchInviteCount();
    this.darkservice.changeMode(this.mode);
  }
  title = 'Source_Safe';
}
