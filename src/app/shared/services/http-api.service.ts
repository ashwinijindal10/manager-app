import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import { Observable, throwError, of, BehaviorSubject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class HttpApiService {
  url: string = environment.apiUrl;
  assetUrl: string = environment.assetUrl;
  data: string;
  param;
  header;

  // TODO: added to reset the list when the user is changed..
  onUserChanged$ = new BehaviorSubject(null);

  /**
   *Creates an instance of HttpApiService.
   * @param {HttpClient} http
   * @memberof HttpApiService
   */
  constructor(private http: HttpClient) {}
  /**
   *
   *
   * @template T
   * @param {string} methodName
   * @param {object} [parameters]
   * @param {boolean} [header]
   * @returns {Observable<T>}
   * @memberof HttpApiService
   */
  getData<T>(
    methodName: string,
    parameters?: object,
    header?: boolean
  ): Observable<T> {
    if (header) {
      const headers = this.createHeaders();
    }
    if (parameters) {
      this.param = new HttpParams();
      for (const [key, value] of Object.entries(parameters)) {
        this.param = this.param.append(key, value);
      }
    }
    return this.http.get<T>(this.url + methodName, { params: this.param });
  }

  /**
   *
   * @param {string} methodName for get details
   * @param header
   */
  getAllData<T>(methodName: string, header?: boolean): Observable<T> {
    if (header) {
      const headers = this.createHeaders();
    }
    return this.http.get<T>(this.url + methodName);
  }

  getSocialData(methodName: string): Observable<Object> {
    return this.http.get(methodName);
  }
  /**
   *
   *
   * @param {string} methodName
   * @param {object} data
   * @returns
   * @memberof HttpApiService
   */
  postData(methodName: string, data: object) {
    const header = this.createHeaders();
    header.append("Content-Type", "application/json");
    return this.http
      .post(this.url + methodName, data, { headers: header })
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  /**
   *
   *
   * @template T
   * @param {string} methodName
   * @param {object} data
   * @param {object} [parameters]
   * @returns {Observable<T>}
   * @memberof HttpApiService
   */
  patchData<T>(
    methodName: string,
    data: object,
    parameters?: object
  ): Observable<T> {
    if (parameters) {
      this.param = new HttpParams();
      for (const [key, value] of Object.entries(parameters)) {
        this.param = this.param.append(key, value);
      }
    }
    return this.http
      .patch<T>(environment.apiUrl + methodName, data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        params: this.param,
        responseType: "json"
      })
      .pipe(
        catchError(err => {
          return of(err);
        })
      );
  }
  /**
   * @param methodName
   * @param data
   * @param parameters
   */
  postDataWithProgress(methodName: string, data: object, parameters?: object) {
    const header = this.createHeaders();
    header.delete("Content-Type");
    if (parameters) {
      this.param = new HttpParams();
      for (const [key, value] of Object.entries(parameters)) {
        this.param = this.param.append(key, value);
      }
    }
    const request = new HttpRequest("POST", this.url + methodName, data, {
      headers: header,
      params: this.param,
      reportProgress: true
    });

    return this.http.request(request).pipe(
      map(res => {
        return res;
      })
    );
  }
  /**
   * @param methodName
   * @param data
   */
  putData(methodName: string, data: object): Observable<any> {
    return this.http
      .put(environment.apiUrl + methodName, data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        responseType: "text"
      })
      .pipe(
        catchError(err => {
          return throwError(this.handleError);
        })
      );
  }
  /**
   *
   *
   * @param {string} methodName
   * @param {object} data
   * @param {object} [parameters]
   * @returns {Observable<any>}
   * @memberof HttpApiService
   */
  updateData(
    methodName: string,
    data: object,
    parameters?: object
  ): Observable<any> {
    if (parameters) {
      this.param = new HttpParams();
      for (const [key, value] of Object.entries(parameters)) {
        this.param = this.param.append(key, value);
      }
    }

    return this.http
      .put(environment.apiUrl + methodName, data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        params: this.param,
        responseType: "text"
      })
      .pipe(
        catchError(err => {
          return of(err);
        })
      );
  }

  deleteData(methodName: string, parameters?: object): Observable<any> {
    // const url = `${environment.apiUrl}/${id}`; // DELETE api/heroes/42
    this.header = new HttpHeaders();
    if (parameters) {
      this.param = new HttpParams();
      for (const [key, value] of Object.entries(parameters)) {
        this.param = this.param.append(key, value);
      }
    }
    return this.http.delete(environment.apiUrl + methodName, {
      params: this.param,
      responseType: "text"
    });
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log("error handling");
    if (error.error instanceof ErrorEvent) {
      console.log("An error occurred:", error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return of(error);
  }

  private createHeaders(jwt_token?: string) {
    const headers = new HttpHeaders().set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    if (jwt_token) {
      headers.set("Authorization", jwt_token);
    }
    return headers;
  }

  getUserName(): string {
    return localStorage.getItem("userName").toString();
  }

  getUserEmail(): string {
    return localStorage.getItem("userEmail");
  }

  getValidUser(data): Observable<any> {
    return this.getData("jobs/GetAllUsers");
  }
  getMockMailList() {
    return this.http.get("/assets/mock/mock-data.json");
  }
}
