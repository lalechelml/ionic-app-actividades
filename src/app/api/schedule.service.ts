import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private httpClient: HttpClient) {}

  insert(formData: FormData) {
    return this.httpClient.post(
      `http://localhost/apiresttraining/public/schedule/insert`,
      formData
    );
  }

  list(formData: FormData) {
    return this.httpClient.post(
      `http://localhost/apiresttraining/public/schedule/list`,
      formData
    );
  }

  update(formData: FormData) {
    return this.httpClient.post(
      `http://localhost/apiresttraining/public/schedule/edit`,
      formData
    );
  }
}
