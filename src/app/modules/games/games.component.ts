import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, Subscription} from "rxjs"
import { Game } from "./../../core/models/game.model"
import { GamesService} from "./../../core/services/games.service"
import { MatDialog } from "@angular/material/dialog"
import { NewGameComponent } from "./new-game/new-game.component"


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Games: Game[]
  hasError: boolean = false
  

  constructor(
    private gamesService: GamesService,
    private dialog: MatDialog
    
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
      this.hasError= true
    })
  }

  openNewGameModal(): void{
    const dialogRef= this.dialog.open(NewGameComponent, {
      width: '600px',
      height: '600px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(newGameAdded =>{
      if(newGameAdded){
        this.Games= undefined
        this.findAllGames()
      }
    })

  }

}
