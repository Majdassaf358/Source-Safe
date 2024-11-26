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
  testt: string = '1';

  constructor(private fb: FormBuilder, private groupService: GroupsService) {}
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges - testt:', this.testt);
  }

  removeSideDisplay() {
    this.show = false;
  }
  initializeGroups() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  testtt() {
    console.log(this.testt);
  }
  initializeMember() {}

  // crateGroupAll() {
  //   this.initializeGroups();
  //   this.crateGroupFunction();
  // }
  async crateGroupFunction(name: string) {
    // const group: groupReq = this.groupForm.getRawValue();
    // console.log(group);

    try {
      let res: ApiResponse<groupRes> = await lastValueFrom(
        this.groupService.createGroup(name)
      );
      console.log(res.message);
      this.show = false;
    } catch (error) {
      console.log(error);
    }
  }
}
