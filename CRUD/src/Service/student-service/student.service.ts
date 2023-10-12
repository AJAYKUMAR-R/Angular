import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentsVariables } from 'src/environments/crud-api/environments';
import { ResponsesData } from 'src/Model/ResponseData';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url:string = environmentsVariables.Students;
  constructor(private http:HttpClient) { }


  GetFee(email:string):Observable<ResponsesData>{
    return this.http.get<ResponsesData>(`${this.url}/${email}`);
  }

  GetProfile(email:string):Observable<ResponsesData>{
    return this.http.get<ResponsesData>(`${this.url}/GetProfile/${email}`);
  }


}
