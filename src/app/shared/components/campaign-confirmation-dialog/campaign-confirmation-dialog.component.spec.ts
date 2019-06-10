import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignConfirmationDialogComponent } from './campaign-confirmation-dialog.component';

describe('CampaignConfirmationDialogComponent', () => {
  let component: CampaignConfirmationDialogComponent;
  let fixture: ComponentFixture<CampaignConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
