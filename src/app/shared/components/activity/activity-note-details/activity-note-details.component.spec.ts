import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityNoteDetailsComponent } from './activity-note-details.component';

describe('ActivityNoteDetailsComponent', () => {
  let component: ActivityNoteDetailsComponent;
  let fixture: ComponentFixture<ActivityNoteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityNoteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityNoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
