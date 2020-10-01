import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse }from "@angular/common/http"
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

}
