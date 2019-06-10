import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpApiService } from './http-api.service';

describe('HttpApiService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  /* it('should be created', () => {
    const service: HttpApiService = TestBed.get(HttpApiService);
    expect(service).toBeTruthy();
  });*/
  it(`should create`, async(inject([HttpTestingController, HttpApiService],
    (httpClient: HttpTestingController, apiService: HttpApiService) => {
        expect(apiService).toBeTruthy();
      }
    )));
});
