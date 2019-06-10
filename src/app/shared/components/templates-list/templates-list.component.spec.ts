import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, ViewChild, NO_ERRORS_SCHEMA, Input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MaterialModule } from '../../../material/material.module';
import { TemplatesListComponent } from './templates-list.component';
import { TemplateItem } from '../template-content/template';
import { TemplateList } from './templateList';

import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { Observable, of } from 'rxjs';
import { TemplatesListService } from './templates-list.service';
const mockMasterData = {
  timeZones: [
    {
      id: 'Dateline Standard Time',
      displayName: '(UTC-12:00)Dateline Standard Time'
    },
    {
      id: 'UTC-11',
      displayName: '(UTC-11:00)UTC-11'
    },
    {
      id: 'Aleutian Standard Time',
      displayName: '(UTC-10:00)Aleutian Standard Time'
    },
    {
      id: 'Hawaiian Standard Time',
      displayName: '(UTC-10:00)Hawaiian Standard Time'
    },
    {
      id: 'Marquesas Standard Time',
      displayName: '(UTC-09:30)Marquesas Standard Time'
    },
    {
      id: 'Alaskan Standard Time',
      displayName: '(UTC-09:00)Alaskan Standard Time'
    },
    {
      id: 'UTC-09',
      displayName: '(UTC-09:00)UTC-09'
    },
    {
      id: 'Pacific Standard Time (Mexico)',
      displayName: '(UTC-08:00)Pacific Standard Time (Mexico)'
    },
    {
      id: 'UTC-08',
      displayName: '(UTC-08:00)UTC-08'
    },
    {
      id: 'Pacific Standard Time',
      displayName: '(UTC-08:00)Pacific Standard Time'
    },
    {
      id: 'US Mountain Standard Time',
      displayName: '(UTC-07:00)US Mountain Standard Time'
    },
    {
      id: 'Mountain Standard Time (Mexico)',
      displayName: '(UTC-07:00)Mountain Standard Time (Mexico)'
    },
    {
      id: 'Mountain Standard Time',
      displayName: '(UTC-07:00)Mountain Standard Time'
    },
    {
      id: 'Central America Standard Time',
      displayName: '(UTC-06:00)Central America Standard Time'
    },
    {
      id: 'Central Standard Time',
      displayName: '(UTC-06:00)Central Standard Time'
    },
    {
      id: 'Easter Island Standard Time',
      displayName: '(UTC-06:00)Easter Island Standard Time'
    },
    {
      id: 'Central Standard Time (Mexico)',
      displayName: '(UTC-06:00)Central Standard Time (Mexico)'
    },
    {
      id: 'Canada Central Standard Time',
      displayName: '(UTC-06:00)Canada Central Standard Time'
    },
    {
      id: 'SA Pacific Standard Time',
      displayName: '(UTC-05:00)SA Pacific Standard Time'
    },
    {
      id: 'Eastern Standard Time (Mexico)',
      displayName: '(UTC-05:00)Eastern Standard Time (Mexico)'
    },
    {
      id: 'Eastern Standard Time',
      displayName: '(UTC-05:00)Eastern Standard Time'
    },
    {
      id: 'Haiti Standard Time',
      displayName: '(UTC-05:00)Haiti Standard Time'
    },
    {
      id: 'Cuba Standard Time',
      displayName: '(UTC-05:00)Cuba Standard Time'
    },
    {
      id: 'US Eastern Standard Time',
      displayName: '(UTC-05:00)US Eastern Standard Time'
    },
    {
      id: 'Turks And Caicos Standard Time',
      displayName: '(UTC-05:00)Turks And Caicos Standard Time'
    },
    {
      id: 'Paraguay Standard Time',
      displayName: '(UTC-04:00)Paraguay Standard Time'
    },
    {
      id: 'Atlantic Standard Time',
      displayName: '(UTC-04:00)Atlantic Standard Time'
    },
    {
      id: 'Venezuela Standard Time',
      displayName: '(UTC-04:00)Venezuela Standard Time'
    },
    {
      id: 'Central Brazilian Standard Time',
      displayName: '(UTC-04:00)Central Brazilian Standard Time'
    },
    {
      id: 'SA Western Standard Time',
      displayName: '(UTC-04:00)SA Western Standard Time'
    },
    {
      id: 'Pacific SA Standard Time',
      displayName: '(UTC-04:00)Pacific SA Standard Time'
    },
    {
      id: 'Newfoundland Standard Time',
      displayName: '(UTC-03:30)Newfoundland Standard Time'
    },
    {
      id: 'Tocantins Standard Time',
      displayName: '(UTC-03:00)Tocantins Standard Time'
    },
    {
      id: 'E. South America Standard Time',
      displayName: '(UTC-03:00)E. South America Standard Time'
    },
    {
      id: 'SA Eastern Standard Time',
      displayName: '(UTC-03:00)SA Eastern Standard Time'
    },
    {
      id: 'Argentina Standard Time',
      displayName: '(UTC-03:00)Argentina Standard Time'
    },
    {
      id: 'Greenland Standard Time',
      displayName: '(UTC-03:00)Greenland Standard Time'
    },
    {
      id: 'Montevideo Standard Time',
      displayName: '(UTC-03:00)Montevideo Standard Time'
    },
    {
      id: 'Magallanes Standard Time',
      displayName: '(UTC-03:00)Magallanes Standard Time'
    },
    {
      id: 'Saint Pierre Standard Time',
      displayName: '(UTC-03:00)Saint Pierre Standard Time'
    },
    {
      id: 'Bahia Standard Time',
      displayName: '(UTC-03:00)Bahia Standard Time'
    },
    {
      id: 'UTC-02',
      displayName: '(UTC-02:00)UTC-02'
    },
    {
      id: 'Mid-Atlantic Standard Time',
      displayName: '(UTC-02:00)Mid-Atlantic Standard Time'
    },
    {
      id: 'Azores Standard Time',
      displayName: '(UTC-01:00)Azores Standard Time'
    },
    {
      id: 'Cape Verde Standard Time',
      displayName: '(UTC-01:00)Cape Verde Standard Time'
    },
    {
      id: 'UTC',
      displayName: '(UTC)UTC'
    },
    {
      id: 'GMT Standard Time',
      displayName: '(UTC+00:00)GMT Standard Time'
    },
    {
      id: 'Greenwich Standard Time',
      displayName: '(UTC+00:00)Greenwich Standard Time'
    },
    {
      id: 'W. Europe Standard Time',
      displayName: '(UTC+01:00)W. Europe Standard Time'
    },
    {
      id: 'Central Europe Standard Time',
      displayName: '(UTC+01:00)Central Europe Standard Time'
    },
    {
      id: 'Romance Standard Time',
      displayName: '(UTC+01:00)Romance Standard Time'
    },
    {
      id: 'Morocco Standard Time',
      displayName: '(UTC+01:00)Morocco Standard Time'
    },
    {
      id: 'Sao Tome Standard Time',
      displayName: '(UTC+01:00)Sao Tome Standard Time'
    },
    {
      id: 'Central European Standard Time',
      displayName: '(UTC+01:00)Central European Standard Time'
    },
    {
      id: 'W. Central Africa Standard Time',
      displayName: '(UTC+01:00)W. Central Africa Standard Time'
    },
    {
      id: 'Jordan Standard Time',
      displayName: '(UTC+02:00)Jordan Standard Time'
    },
    {
      id: 'GTB Standard Time',
      displayName: '(UTC+02:00)GTB Standard Time'
    },
    {
      id: 'Middle East Standard Time',
      displayName: '(UTC+02:00)Middle East Standard Time'
    },
    {
      id: 'Egypt Standard Time',
      displayName: '(UTC+02:00)Egypt Standard Time'
    },
    {
      id: 'E. Europe Standard Time',
      displayName: '(UTC+02:00)E. Europe Standard Time'
    },
    {
      id: 'Syria Standard Time',
      displayName: '(UTC+02:00)Syria Standard Time'
    },
    {
      id: 'West Bank Standard Time',
      displayName: '(UTC+02:00)West Bank Standard Time'
    },
    {
      id: 'South Africa Standard Time',
      displayName: '(UTC+02:00)South Africa Standard Time'
    },
    {
      id: 'FLE Standard Time',
      displayName: '(UTC+02:00)FLE Standard Time'
    },
    {
      id: 'Israel Standard Time',
      displayName: '(UTC+02:00)Israel Standard Time'
    },
    {
      id: 'Kaliningrad Standard Time',
      displayName: '(UTC+02:00)Kaliningrad Standard Time'
    },
    {
      id: 'Sudan Standard Time',
      displayName: '(UTC+02:00)Sudan Standard Time'
    },
    {
      id: 'Libya Standard Time',
      displayName: '(UTC+02:00)Libya Standard Time'
    },
    {
      id: 'Namibia Standard Time',
      displayName: '(UTC+02:00)Namibia Standard Time'
    },
    {
      id: 'Arabic Standard Time',
      displayName: '(UTC+03:00)Arabic Standard Time'
    },
    {
      id: 'Turkey Standard Time',
      displayName: '(UTC+03:00)Turkey Standard Time'
    },
    {
      id: 'Arab Standard Time',
      displayName: '(UTC+03:00)Arab Standard Time'
    },
    {
      id: 'Belarus Standard Time',
      displayName: '(UTC+03:00)Belarus Standard Time'
    },
    {
      id: 'Russian Standard Time',
      displayName: '(UTC+03:00)Russian Standard Time'
    },
    {
      id: 'E. Africa Standard Time',
      displayName: '(UTC+03:00)E. Africa Standard Time'
    },
    {
      id: 'Iran Standard Time',
      displayName: '(UTC+03:30)Iran Standard Time'
    },
    {
      id: 'Arabian Standard Time',
      displayName: '(UTC+04:00)Arabian Standard Time'
    },
    {
      id: 'Astrakhan Standard Time',
      displayName: '(UTC+04:00)Astrakhan Standard Time'
    },
    {
      id: 'Azerbaijan Standard Time',
      displayName: '(UTC+04:00)Azerbaijan Standard Time'
    },
    {
      id: 'Russia Time Zone 3',
      displayName: '(UTC+04:00)Russia Time Zone 3'
    },
    {
      id: 'Mauritius Standard Time',
      displayName: '(UTC+04:00)Mauritius Standard Time'
    },
    {
      id: 'Saratov Standard Time',
      displayName: '(UTC+04:00)Saratov Standard Time'
    },
    {
      id: 'Georgian Standard Time',
      displayName: '(UTC+04:00)Georgian Standard Time'
    },
    {
      id: 'Volgograd Standard Time',
      displayName: '(UTC+04:00)Volgograd Standard Time'
    },
    {
      id: 'Caucasus Standard Time',
      displayName: '(UTC+04:00)Caucasus Standard Time'
    },
    {
      id: 'Afghanistan Standard Time',
      displayName: '(UTC+04:30)Afghanistan Standard Time'
    },
    {
      id: 'West Asia Standard Time',
      displayName: '(UTC+05:00)West Asia Standard Time'
    },
    {
      id: 'Ekaterinburg Standard Time',
      displayName: '(UTC+05:00)Ekaterinburg Standard Time'
    },
    {
      id: 'Pakistan Standard Time',
      displayName: '(UTC+05:00)Pakistan Standard Time'
    },
    {
      id: 'India Standard Time',
      displayName: '(UTC+05:30)India Standard Time'
    },
    {
      id: 'Sri Lanka Standard Time',
      displayName: '(UTC+05:30)Sri Lanka Standard Time'
    },
    {
      id: 'Nepal Standard Time',
      displayName: '(UTC+05:45)Nepal Standard Time'
    },
    {
      id: 'Central Asia Standard Time',
      displayName: '(UTC+06:00)Central Asia Standard Time'
    },
    {
      id: 'Bangladesh Standard Time',
      displayName: '(UTC+06:00)Bangladesh Standard Time'
    },
    {
      id: 'Omsk Standard Time',
      displayName: '(UTC+06:00)Omsk Standard Time'
    },
    {
      id: 'Myanmar Standard Time',
      displayName: '(UTC+06:30)Myanmar Standard Time'
    },
    {
      id: 'SE Asia Standard Time',
      displayName: '(UTC+07:00)SE Asia Standard Time'
    },
    {
      id: 'Altai Standard Time',
      displayName: '(UTC+07:00)Altai Standard Time'
    },
    {
      id: 'W. Mongolia Standard Time',
      displayName: '(UTC+07:00)W. Mongolia Standard Time'
    },
    {
      id: 'North Asia Standard Time',
      displayName: '(UTC+07:00)North Asia Standard Time'
    },
    {
      id: 'N. Central Asia Standard Time',
      displayName: '(UTC+07:00)N. Central Asia Standard Time'
    },
    {
      id: 'Tomsk Standard Time',
      displayName: '(UTC+07:00)Tomsk Standard Time'
    },
    {
      id: 'China Standard Time',
      displayName: '(UTC+08:00)China Standard Time'
    },
    {
      id: 'North Asia East Standard Time',
      displayName: '(UTC+08:00)North Asia East Standard Time'
    },
    {
      id: 'Singapore Standard Time',
      displayName: '(UTC+08:00)Singapore Standard Time'
    },
    {
      id: 'W. Australia Standard Time',
      displayName: '(UTC+08:00)W. Australia Standard Time'
    },
    {
      id: 'Taipei Standard Time',
      displayName: '(UTC+08:00)Taipei Standard Time'
    },
    {
      id: 'Ulaanbaatar Standard Time',
      displayName: '(UTC+08:00)Ulaanbaatar Standard Time'
    },
    {
      id: 'Aus Central W. Standard Time',
      displayName: '(UTC+08:45)Aus Central W. Standard Time'
    },
    {
      id: 'Transbaikal Standard Time',
      displayName: '(UTC+09:00)Transbaikal Standard Time'
    },
    {
      id: 'Tokyo Standard Time',
      displayName: '(UTC+09:00)Tokyo Standard Time'
    },
    {
      id: 'North Korea Standard Time',
      displayName: '(UTC+09:00)North Korea Standard Time'
    },
    {
      id: 'Korea Standard Time',
      displayName: '(UTC+09:00)Korea Standard Time'
    },
    {
      id: 'Yakutsk Standard Time',
      displayName: '(UTC+09:00)Yakutsk Standard Time'
    },
    {
      id: 'Cen. Australia Standard Time',
      displayName: '(UTC+09:30)Cen. Australia Standard Time'
    },
    {
      id: 'AUS Central Standard Time',
      displayName: '(UTC+09:30)AUS Central Standard Time'
    },
    {
      id: 'E. Australia Standard Time',
      displayName: '(UTC+10:00)E. Australia Standard Time'
    },
    {
      id: 'AUS Eastern Standard Time',
      displayName: '(UTC+10:00)AUS Eastern Standard Time'
    },
    {
      id: 'West Pacific Standard Time',
      displayName: '(UTC+10:00)West Pacific Standard Time'
    },
    {
      id: 'Tasmania Standard Time',
      displayName: '(UTC+10:00)Tasmania Standard Time'
    },
    {
      id: 'Vladivostok Standard Time',
      displayName: '(UTC+10:00)Vladivostok Standard Time'
    },
    {
      id: 'Lord Howe Standard Time',
      displayName: '(UTC+10:30)Lord Howe Standard Time'
    },
    {
      id: 'Bougainville Standard Time',
      displayName: '(UTC+11:00)Bougainville Standard Time'
    },
    {
      id: 'Russia Time Zone 10',
      displayName: '(UTC+11:00)Russia Time Zone 10'
    },
    {
      id: 'Magadan Standard Time',
      displayName: '(UTC+11:00)Magadan Standard Time'
    },
    {
      id: 'Norfolk Standard Time',
      displayName: '(UTC+11:00)Norfolk Standard Time'
    },
    {
      id: 'Sakhalin Standard Time',
      displayName: '(UTC+11:00)Sakhalin Standard Time'
    },
    {
      id: 'Central Pacific Standard Time',
      displayName: '(UTC+11:00)Central Pacific Standard Time'
    },
    {
      id: 'Russia Time Zone 11',
      displayName: '(UTC+12:00)Russia Time Zone 11'
    },
    {
      id: 'New Zealand Standard Time',
      displayName: '(UTC+12:00)New Zealand Standard Time'
    },
    {
      id: 'UTC+12',
      displayName: '(UTC+12:00)UTC+12'
    },
    {
      id: 'Fiji Standard Time',
      displayName: '(UTC+12:00)Fiji Standard Time'
    },
    {
      id: 'Kamchatka Standard Time',
      displayName: '(UTC+12:00)Kamchatka Standard Time'
    },
    {
      id: 'Chatham Islands Standard Time',
      displayName: '(UTC+12:45)Chatham Islands Standard Time'
    },
    {
      id: 'UTC+13',
      displayName: '(UTC+13:00)UTC+13'
    },
    {
      id: 'Tonga Standard Time',
      displayName: '(UTC+13:00)Tonga Standard Time'
    },
    {
      id: 'Samoa Standard Time',
      displayName: '(UTC+13:00)Samoa Standard Time'
    },
    {
      id: 'Line Islands Standard Time',
      displayName: '(UTC+14:00)Line Islands Standard Time'
    }
  ],
  categories: [
    {
      code: 'P',
      value: 'Promotion'
    },
    {
      code: 'N',
      value: 'Newsletter'
    },
    {
      code: 'E',
      value: 'Event'
    },
    {
      code: 'J',
      value: 'Job'
    },
    {
      code: 'JA',
      value: 'Job Alerts'
    },
    {
      code: 'O',
      value: 'Others'
    }
  ],
  types: [
    {
      code: 'B',
      value: 'BRANDED CX'
    },
    {
      code: 'O',
      value: 'MY TEMPLATES'
    }
  ],
  statuses: [
    {
      code: 'D',
      value: 'DRAFT'
    },
    {
      code: 'A',
      value: 'APPROVED'
    },
    {
      code: 'S',
      value: 'SAVED'
    },
    {
      code: 'PFA',
      value: 'PENDING FOR APPROVAL'
    }
  ]
};

class MockService {
  getMasterData(): Observable<any> {
    return of(mockMasterData);
  }
  getTemplateList(): Observable<any> {
    return null;
  }
}
@Component({
  selector: 'app-template-content',
  template: '<p>Mock template content</p>'
})
class MockTemplateContentComponent {
  @Input() showCreate = false;
  @Input() template: TemplateItem;
  @Input() popover = true;
  @Input() disableSelection = false;
  @Input() actionText = 'USE';
}

describe('TemplatesListComponent', () => {
  let component: TemplatesListComponent;
  let fixture: ComponentFixture<TemplatesListComponent>;
  let myService: TemplatesListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule, Ng2CarouselamosModule],
      declarations: [TemplatesListComponent, MockTemplateContentComponent],
      providers: [{ provide: TemplatesListService, useClass: MockService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesListComponent);
    component = fixture.componentInstance;
    myService = TestBed.get(TemplatesListService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check data needed for category', () => {
    console.log(this.mockMasterData);
    const mockDataCategories = [
      {
        code: 'P',
        value: 'Promotion'
      },
      {
        code: 'N',
        value: 'Newsletter'
      },
      {
        code: 'E',
        value: 'Event'
      },
      {
        code: 'J',
        value: 'Job'
      },
      {
        code: 'JA',
        value: 'Job Alerts'
      },
      {
        code: 'O',
        value: 'Others'
      }
    ];
    component.formCategory(mockDataCategories);
    const newUpdatedCategory = component.availableTemplateCategory;
    const mockUpdateCategories = [
      {
        code: 'All',
        value: 'All'
      },
      {
        code: 'P',
        value: 'Promotion'
      },
      {
        code: 'N',
        value: 'Newsletter'
      },
      {
        code: 'E',
        value: 'Event'
      },
      {
        code: 'J',
        value: 'Job'
      },
      {
        code: 'JA',
        value: 'Job Alerts'
      },
      {
        code: 'O',
        value: 'Others'
      }
    ];
    expect(newUpdatedCategory).toEqual(mockUpdateCategories);
  });

  it('check data needed for type', () => {
    console.log(this.mockMasterData);
    const mockDataTypes = [
      {
        code: 'B',
        value: 'BRANDED CX'
      },
      {
        code: 'O',
        value: 'MY TEMPLATES'
      }
    ];
    component.formType(mockDataTypes);
    const newUpdatedTypes = component.availableTemplateTypes;
    const mockUpdateTypes = [
      {
        code: 'All',
        value: 'ALL TEMPLATES',
        selectedCategory: 'All'
      },
      {
        code: 'B',
        value: 'BRANDED CX',
        selectedCategory: 'All'
      },
      {
        code: 'O',
        value: 'MY TEMPLATES',
        selectedCategory: 'All'
      }
    ];
    expect(newUpdatedTypes).toEqual(mockUpdateTypes);
  });

  it('should call getMasterData method', () => {
    spyOn(myService, 'getMasterData').and.returnValue(of(mockMasterData));
    component.getMasterData();
    fixture.detectChanges();
    expect(myService.getMasterData).toHaveBeenCalled();
  });
  it('should get masterData', () => {
    spyOn(myService, 'getMasterData').and.returnValue(of(mockMasterData));
    component.getMasterData();
    myService.getMasterData().subscribe(response => {
      expect(response).toEqual(mockMasterData);
    });
  });
  // it('should call getTemplateList method', () => {
  //   spyOn(myService, 'getTemplateList').and.returnValue(of(mockTemplateList));
  //   component.showTemplateList(mockMasterData.categories, mockMasterData.types);
  //   fixture.detectChanges();
  //   expect(myService.getTemplateList).toHaveBeenCalledWith('P', 'B');
  // });
});
