import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PartialLoaderService {
  constructor(private http: HttpClient) {}

  getPartial(name: string) {
    return this.http.get(`/assets/partials/${name}.html`, {
      responseType: 'text',
    });
  }
}
