import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { APIarray } from '../../models/APIarray';
import { viewgroup } from '../../models/viewgroup';
import { lastValueFrom } from 'rxjs';
import { GroupsService } from '../../services/groups.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

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
  mode:string = '';
  constructor(private groupService: GroupsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.mode = paramsMap.get('allOrMy') || '';
      if (this.mode == 'all') {
        this.getGroups();
      } else {
        this.getMyGroups();
      }
    });
  }
    // this.getGroups();
  
  openPopUpUpload() {
    this.showPopUp = true;
    this.displayPopUp = 'upload';
  }
  openPopUpCreate() {
    this.showPopUp = true;
    this.displayPopUp = 'create';
  }

  async getMyGroups() {
    try {
      let res: APIarray<viewgroup> = await lastValueFrom(
        this.groupService.getMyGroups()
      );
      this.groups = res.data;
    } catch (error) {
      console.log(error);
    }
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
