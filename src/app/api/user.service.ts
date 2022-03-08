import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  logIn(formData: FormData) {
    return this.httpClient.post(
      `http://localhost/apiresttraining/public/user/login`,
      formData
    );
  }

  insert(formData: FormData) {
    return this.httpClient.post(
      `http://localhost/apiresttraining/public/user/insert`,
      formData
    );
  }
}
