import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDispalyComponent } from './error-dispaly.component';

describe('ErrorDispalyComponent', () => {
  let component: ErrorDispalyComponent;
  let fixture: ComponentFixture<ErrorDispalyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDispalyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDispalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
