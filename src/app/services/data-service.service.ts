import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {

  }

  apiUrl: string = 'https://reqres.in/api/users';

  public getData(): Observable<any> {

    return this.http.get(this.apiUrl);
  }

}
