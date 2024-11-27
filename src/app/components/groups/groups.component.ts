import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { temporaryy } from '../../models/temporary';
import { viewgroup } from '../../models/viewgroup';
import { lastValueFrom } from 'rxjs';
import { GroupsService } from '../../services/groups.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [PopUpComponent, FormsModule, CommonModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css',
})
export class GroupsComponent implements OnInit {
  showPopUp: boolean = false;
  display: string = '';
  groups: viewgroup[] = [];
  constructor(private groupService: GroupsService) {}
  ngOnInit(): void {
    this.getGroups();
  }
  openPopUpUpload() {
    this.showPopUp = true;
    this.display = 'upload';
  }
  openPopUpCreate() {
    this.showPopUp = true;
    this.display = 'create';
  }

  async getGroups() {
    try {
      let res: temporaryy<viewgroup> = await lastValueFrom(
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
