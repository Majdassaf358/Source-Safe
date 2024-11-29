import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { groupReq } from '../../models/groupReq';
import { groupRes } from '../../models/groupRes';
import { ApiResponse } from '../../models/ApiResponse';
import { GroupsService } from '../../services/groups.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent implements OnChanges {
  @Input() show?: boolean;
  @Input() display?: string;

  groupForm!: FormGroup;
  groupName: string = '';

  constructor(
    private fb: FormBuilder,
    private groupService: GroupsService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges) {}

  removeSideDisplay() {
    this.show = false;
  }
  initializeGroups() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  initializeMember() {}

  // crateGroupAll() {
  //   this.initializeGroups();
  //   this.crateGroupFunction();
  // }
  async crateGroupFunction() {
    try {
      let res: ApiResponse<groupRes> = await lastValueFrom(
        this.groupService.createGroup(this.groupName)
      );
      console.log(res.message);
      this.show = false;
    } catch (error) {
      console.log(error);
    }
  }
}
