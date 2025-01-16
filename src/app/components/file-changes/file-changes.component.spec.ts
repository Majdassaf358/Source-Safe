import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileChangesComponent } from './file-changes.component';

describe('FileChangesComponent', () => {
  let component: FileChangesComponent;
  let fixture: ComponentFixture<FileChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileChangesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
