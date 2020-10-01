import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { Developer } from "./../models/developer.model"
import { API_URL }  from "./../api"

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  constructor(
    private http: HttpClient) { }


  findAllDevelopers(): Observable<HttpResponse<Developer[]>>{
    return this.http.get<Developer[]>(`${API_URL}/developers/listarTodas`, {observe: 'response'})
  }

  createNewDeveloper(body: Developer): Observable<HttpResponse<Developer>>{
    return this.http.post<Developer>(`${API_URL}/developers/criar`, body, {observe: 'response'})
  }

}
