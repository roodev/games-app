import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from "@angular/router"
import { Subscription } from "rxjs"
import { GamesService } from"./../../../core/services/games.service" 
import { Game } from "./../../../core/models/game.model"
import { MatDialog } from '@angular/material/dialog';
import { UpdateGameComponent } from './../update-game/update-game.component'

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Game: Game
  hasError: boolean= false
  gameName: String

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private gamesService: GamesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.gameName= this.ActivatedRoute.snapshot.params['gameName']
    this.findGameByName(this.gameName)
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

  openUpdateGameModal(): void{
    const dialogRef = this.dialog.open(UpdateGameComponent, {
      disableClose: true,
      width: '600px',
      height: '600px',
      data: this.Game
    })

    dialogRef.afterClosed().subscribe(updatedGame => {
      if(updatedGame){
        this.Game = undefined
        this.findGameByName(this.gameName)
      }
    })

  }
  

}
  