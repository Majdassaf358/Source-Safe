import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { APIarray } from '../../models/APIarray';
import { viewgroup } from '../../models/viewgroup';
import { lastValueFrom } from 'rxjs';
import { GroupsService } from '../../services/groups.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [PopUpComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css',
})
export class GroupsComponent implements OnInit {
  showPopUp: boolean = false;
  displayPopUp: string = '';
  groups: viewgroup[] = [];
  constructor(private groupService: GroupsService) {}
  ngOnInit(): void {
    this.getGroups();
  }
  openPopUpUpload() {
    this.showPopUp = true;
    this.displayPopUp = 'upload';
  }
  openPopUpCreate() {
    this.showPopUp = true;
    this.displayPopUp = 'create';
  }

  async getGroups() {
    try {
      let res: APIarray<viewgroup> = await lastValueFrom(
        this.groupService.getGroups()
      );
      this.groups = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as Element;
    if (!targetElement.closest('app-pop-up')) {
      this.showPopUp = false;
    }
  }
}
