import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityNoteDetailsCommentsDialogComponent } from './activity-note-details-comments-dialog.component';

describe('ActivityNoteDetailsCommentsDialogComponent', () => {
  let component: ActivityNoteDetailsCommentsDialogComponent;
  let fixture: ComponentFixture<ActivityNoteDetailsCommentsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityNoteDetailsCommentsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityNoteDetailsCommentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
