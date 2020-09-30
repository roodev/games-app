import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, Subscription} from "rxjs"
import { Game } from "./../../core/models/game.model"
import { GamesService} from "./../../core/services/games.service"
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Games: Game[]
  

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.findAllGames()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllGames(): void{
    this.httpRequest= this.gamesService.findAllGames().subscribe(response =>{      
      this.Games= response.body['data']      
    }, err => {
      console.log(err)
    })
  }

}
