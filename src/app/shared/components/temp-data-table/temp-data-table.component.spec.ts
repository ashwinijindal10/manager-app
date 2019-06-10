import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempDataTableComponent } from './temp-data-table.component';

describe('TempDataTableComponent', () => {
  let component: TempDataTableComponent;
  let fixture: ComponentFixture<TempDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
