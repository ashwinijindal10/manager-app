import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    // Temporary code to store user id.
    // Once Authentication use case is implemented
    // userid should be stored when successsful authentication
    localStorage.setItem('userId', '1');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }
}
