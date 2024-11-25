import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent implements OnChanges {
  @Input() showSide: boolean = false;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}

  removeSideDisplay() {
    this.showSide = false;
  }
}
