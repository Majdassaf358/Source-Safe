import { Component, OnInit } from '@angular/core';
import { InvitesService } from '../../services/invites.service';
import { Invite } from '../../models/invite';
import { APIarray } from '../../models/APIarray';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-invites',
  standalone: true,
  imports: [],
  templateUrl: './invites.component.html',
  styleUrl: './invites.component.css',
})
export class InvitesComponent implements OnInit {
  invites: Invite[] = [];
  constructor(private inviteService: InvitesService) {}
  ngOnInit(): void {
    this.inviteService.fetchInviteCount();
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
  // async sendInvite() {
  //   try {
  //     let res: APIarray<Invite> = await lastValueFrom(
  //       this.inviteService.viewMyInvitations()
  //     );
  //     this.invites = res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
