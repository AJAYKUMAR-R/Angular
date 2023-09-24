import { Injectable } from '@angular/core';
import {Student} from 'src/Model/Student'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ResponsesData } from 'src/Model/ResponseData';
import { environmentsVariables } from 'src/environments/crud-api/environments';


//Responsible For SingleTon
//Also included by default in the Provider in app Module
@Injectable({
  providedIn: 'root'
})

export class ModelService {

  url:string = environmentsVariables.appUrl;

  //REQUESTE GENERATED HERE

  constructor(private http:HttpClient) { 

  }

  getStudent():Observable<ResponsesData>{
    return this.http.get<ResponsesData>(this.url);
  }

  getStudentByID(id:number):Observable<ResponsesData>{
    return this.http.get<ResponsesData>(`${this.url}/${id}`);
  }

  postStudent(student:any):Observable<ResponsesData>{
    return this.http.post<ResponsesData>(this.url,student);
  }

  putStudent(student:any,id:number):Observable<Student>{
    return this.http.put<any>(`${this.url}/${id}`,student);
  }

  deleteStudent(id:number){
    return this.http.delete<any>(`${this.url}/${id}`);
  }


}
