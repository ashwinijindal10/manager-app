import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDetailViewComponent } from './message-detail-view.component';

describe('MessageDetailViewComponent', () => {
  let component: MessageDetailViewComponent;
  let fixture: ComponentFixture<MessageDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
