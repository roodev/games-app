import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from "@angular/router"
import { Subscription } from "rxjs"
import { GamesService } from"./../../../core/services/games.service" 
import { Game } from "./../../../core/models/game.model"

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Game: Game
  hasError: boolean= false

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    const gameName= this.ActivatedRoute.snapshot.params['gameName']
    this.findGameByName(gameName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findGameByName(gameName: String): void{
    this.httpRequest= this.gamesService.findGameByName(gameName).subscribe(response =>{
     this.Game =response.body['data']
     console.log(this.Game) 
    }, err =>{
      this.hasError= true
    })
  }

}
  