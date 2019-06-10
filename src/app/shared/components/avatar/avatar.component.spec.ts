import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';
import { MaterialModule } from '../../../material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

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
      ],
      declarations: [AvatarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('data should be in Upper case', () => {
    component.data = 'tn';
    component.config = {
      height: '32px',
      width: '32px',
      'background-color': 'white',
      border: '1px solid  #72889c',
      color: '#263343 !important',
      margin: '0px 8px 0px 0',
      'font-size': '16px',
      'font-weight': '600'
    };
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.avatar')).nativeElement.innerText).toBe('TN');

  });
});
