import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCancelComponent } from './save-cancel.component';
import { MaterialModule } from '../../../material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';

describe('SaveCancelComponent', () => {
  let component: SaveCancelComponent;
  let fixture: ComponentFixture<SaveCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        FlexLayoutModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        MatIconModule
      ],
      declarations: [SaveCancelComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    spyOn(component, 'save').and.callThrough();
    fixture.debugElement.queryAll(By.css('mat-icon'))[1].triggerEventHandler('click', null);
    expect(component.save).toHaveBeenCalled();
  });

  it('should cancel', () => {
    spyOn(component, 'cancel').and.callThrough();
    fixture.debugElement.queryAll(By.css('mat-icon'))[0].triggerEventHandler('click', null);
    expect(component.cancel).toHaveBeenCalled();
  });
});
