import { Component, OnInit } from '@angular/core';
import { InvitesService } from '../../services/invites.service';
import { Invite } from '../../models/invite';
import { APIarray } from '../../models/APIarray';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../models/ApiResponse';
import { nodata } from '../../models/nodata';

@Component({
  selector: 'app-invites',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './invites.component.html',
  styleUrl: './invites.component.css',
})
export class InvitesComponent implements OnInit {
  invites: Invite[] = [];
  inviteID?: number = 0;
  constructor(private inviteService: InvitesService) {}
  ngOnInit(): void {
    this.getInvites();
  }

  async getInvites() {
    try {
      let res: APIarray<Invite> = await lastValueFrom(
        this.inviteService.viewMyInvitations()
      );
      this.invites = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async acceptInvite(id?:number) {
    try {
      let res: ApiResponse<nodata> = await lastValueFrom(
        this.inviteService.acceptInvitation(id)
      );
    } catch (error) {
      console.log(error);
    }
  }
  async rejectInvite(id?:number) {
    try {
      let res: ApiResponse<nodata> = await lastValueFrom(
        this.inviteService.rejectInvitation(id)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
