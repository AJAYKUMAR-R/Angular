import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentsVariables } from 'src/environments/crud-api/environments';
import { ResponsesData } from 'src/Model/ResponseData';
import { Observable } from 'rxjs';
import { SearchParameters } from 'src/Model/SearchParameters';


@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  url:string = environmentsVariables.paginationUrl;

  constructor(private http:HttpClient) { }

  getRecordPerPage(param:SearchParameters):Observable<ResponsesData>{
    return this.http.post<ResponsesData>(`${this.url}`,param);
  }


}
