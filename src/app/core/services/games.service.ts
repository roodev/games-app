import { Injectable } from '@angular/core';
import { HttpClient,  HttpResponse, HttpParams }from "@angular/common/http"
import { Observable } from "rxjs"
import { Game } from "./../models/game.model"
import { API_URL } from "./../api"


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private http: HttpClient) { }

  findAllGames(): Observable<HttpResponse<Game[]>>{
    return this.http.get<Game[]>(`${API_URL}/games/listarTodos`, { observe: 'response' })
  }

  findGameByName(gameName: String): Observable<HttpResponse<Game>>{
    return this.http.get<Game>(`${API_URL}/games/listarUm/${gameName}`, {observe: 'response' })
  }

  createNewGame(body: Game): Observable<HttpResponse<Game>>{
    return this.http.post<Game>(`${API_URL}/games/criar`, body, {observe: 'response'})
  }

  validatorUniqueGameName(gameName: string){
    let myParams = new HttpParams()
    myParams = myParams.append('nome', gameName)
    return this.http.get<any>(`${API_URL}/games/validarNomeGame`, {params: myParams}) 

  }

}
