import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityNoteDetailsCommentsComponent } from './activity-note-details-comments.component';

describe('ActivityNoteDetailsCommentsComponent', () => {
  let component: ActivityNoteDetailsCommentsComponent;
  let fixture: ComponentFixture<ActivityNoteDetailsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityNoteDetailsCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityNoteDetailsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
