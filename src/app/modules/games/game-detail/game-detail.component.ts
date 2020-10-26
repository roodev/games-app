import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router"
import { Subscription } from "rxjs"
import { GamesService } from"./../../../core/services/games.service" 
import { Game } from "./../../../core/models/game.model"
import { MatDialog } from '@angular/material/dialog';
import { UpdateGameComponent } from './../update-game/update-game.component'
import { ConfirmComponent } from './../../../components/confirm/confirm.component'
import { ToastrComponentlessModule } from 'ngx-toastr';
import { MyToastrService } from 'src/app/core/services/toastr.service';


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
    private dialog: MatDialog,
    private toastr: MyToastrService,
    private route: Router
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

  openConfirmModal(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      width: '600px',
      height: '160px',
      data: `Deseja apagar o game ${this.Game['nome']}? A ação é irreversível!`
    })

    dialogRef.afterClosed().subscribe(confirmed => {
      if(confirmed){
        this.deleteGame(this.Game['_id'])

      }
    })
  }

  deleteGame(gameId: String): void {
    this.httpRequest = this.gamesService.deleteGameById(gameId).subscribe(response => {
      this.toastr.showToastrSuccess(`O game ${this.Game['nome']} foi apagado com sucesso`)
      this.route.navigate(['/games'])      
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)

    })
  }
  

}
  