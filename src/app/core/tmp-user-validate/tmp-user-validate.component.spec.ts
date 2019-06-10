import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpUserValidateComponent } from './tmp-user-validate.component';

describe('TmpUserValidateComponent', () => {
  let component: TmpUserValidateComponent;
  let fixture: ComponentFixture<TmpUserValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmpUserValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmpUserValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
