import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Game } from "./../../../core/models/game.model";
import { Developer } from "./../../../core/models/developer.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DevelopersService } from 'src/app/core/services/developers.service';
import { GamesService } from 'src/app/core/services/games.service';
import { Subscription } from 'rxjs';
import { MyToastrService } from 'src/app/core/services/toastr.service';


@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.css']
})
export class UpdateGameComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  Game: Game
  gameFormGroup: FormGroup
  developers: Developer[]

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Game,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateGameComponent>,
    private developersService: DevelopersService,
    private gamesService: GamesService,
    private toastr: MyToastrService
  ) {
    this.Game = data
   }

  ngOnInit(): void {  
    this.findAllDevelopers()
    this.initializeGameFormGroup() 
    this.populateGameFormGroup()         
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllDevelopers(): void {
    this.httpRequest = this.developersService.findAllDevelopers().subscribe(response => {
      this.developers = response.body['data']
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']} `)
    })

  }

  initializeGameFormGroup(): void {
    this.gameFormGroup = this.builder.group({
      plataforma: this.builder.control(null, [Validators.required]),
      sinopse: this.builder.control(null, [Validators.required]),
      imagem: this.builder.control(null, [Validators.required]),
      developer: this.builder.control(null, [Validators.required]),
      classificacao: this.builder.control(null)
    })
  }

  populateGameFormGroup(): void {
    this.gameFormGroup.patchValue({
      plataforma: this.Game['plataforma'],
      sinopse: this.Game['sinopse'],
      imagem: this.Game['imagem'],
      classificacao: this.Game['classificacao'],
      developer: this.Game['developer']
    })
  }

  compareDeveloper(d1: Developer, d2: Developer): boolean {
    return d1 && d2 ? d1._id === d2._id : d1 === d2
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
  }

  updateGame(): void {
    this.httpRequest = this.gamesService.updateGameById(this.Game['_id'], this.gameFormGroup.value).subscribe(response =>{
      this.toastr.showToastrSuccess(`O game ${this.Game['nome']} foi atualizado com sucesso`)
      this.closeDialog(true)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
      this.closeDialog()
    })

  }

}
