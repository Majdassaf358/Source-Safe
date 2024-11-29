import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ApiResponse } from '../../../models/ApiResponse';
import { profile } from '../../../models/profile';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profile: profile = new profile();
  constructor(private profileService: AuthenticationService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  async getProfile() {
    try {
      let res: ApiResponse<profile> = await lastValueFrom(
        this.profileService.getProfile()
      );
      this.profile = res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
