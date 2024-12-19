import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DirectionService } from '../../../services/direction.service';
import { DarkService } from '../../../services/dark.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { InvitesService } from '../../../services/invites.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  language: string = '';
  selectedFlag: string = 'assets/img/united-kingdom.png';
  selectedlang: string = 'English';
  mode: boolean = false;
  flags = [
    {
      src: 'assets/img/united-kingdom.png',
      language: 'English',
      lang: 'en',
    },
    { src: 'assets/img/syria.png', language: 'Arabic', lang: 'ar' },
  ];
  inviteCount: number = 0;
  constructor(
    private invitesService: InvitesService,
    private translateService: TranslateService,
    private directionService: DirectionService,
    private darkService: DarkService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.invitesService.inviteCount$.subscribe((count) => {
      this.inviteCount = count;
    });
    const modeState = localStorage.getItem('mode');
    this.mode = modeState ? JSON.parse(modeState) : false;
  }

  changeMode(): void {
    this.mode = !this.mode;
    localStorage.setItem('mode', JSON.stringify(this.mode));
    this.darkService.changeMode(this.mode);
  }

  changeLan(lang: any) {
    if (lang == 'en') {
      this.selectedFlag = 'assets/img/united-kingdom.png';
      this.selectedlang = 'English';
    } else {
      this.selectedFlag = 'assets/img/syria.png';
      this.selectedlang = 'Arabic';
    }
    localStorage.setItem('language', lang);
    this.translateService.use(lang);
    this.directionService.toggleExternalStyles(lang);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
