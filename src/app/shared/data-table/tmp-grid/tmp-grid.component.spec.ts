import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpGridComponent } from './tmp-grid.component';

describe('TmpGridComponent', () => {
  let component: TmpGridComponent;
  let fixture: ComponentFixture<TmpGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmpGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmpGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
