import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"
import { MatDialogRef } from "@angular/material/dialog"
import { Subscription } from "rxjs"
import { Developer } from "./../../../core/models/developer.model"
import { DevelopersService } from "./../../../core/services/developers.service"
import { MyToastrService } from "./../../../core/services/toastr.service"
import { GamesService } from "./../../../core/services/games.service"
import { DeveloperValidator} from './../../../core/validators/developer.validator'
import { GameValidator } from "./../../../core/validators/game.validator"


@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription 

  developerFormGroup: FormGroup
  isNewDeveloper: boolean= false
  developers: Developer[]
  stepDeveloperLabel: String='Developer'
  gameFormGroup: FormGroup

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private developersService: DevelopersService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private gamesService: GamesService,
    private dialogRef: MatDialogRef<NewGameComponent>,
    private developerValidator: DeveloperValidator,
    private gameValidator: GameValidator
  ) { }

  ngOnInit(): void {
    this.findAllDevelopers()
    this.initializeSelectDeveloperFormGroup()
    this.initializeGameFormGroup()
  }

  ngOnDestroy(): void{

  }

  findAllDevelopers(): void{
    this.httpRequest= this.developersService.findAllDevelopers().subscribe(response =>{
      this.developers= response.body['data']
    }, err=> {
      console.log(err.error['message'])
    })
  }

  initializeSelectDeveloperFormGroup(): void{
    this.developerFormGroup= this.builder.group({
      developer: this.builder.control(null, [Validators.required])
    })

  }

  initializeNewDeveloperFormGroup(): void{
    this.developerFormGroup= this.builder.group({
      nome: this.builder.control(null, [Validators.required], this.developerValidator.validatorUniqueDeveloperName()),
      imagem: this.builder.control(null, [Validators.required]),
      nacionalidade: this.builder.control(null, [Validators.required]),
      plataforma: this.builder.control(null,[Validators.required])
    })    
  }

  initializeGameFormGroup(): void{
    this.gameFormGroup= this.builder.group({
      nome: this.builder.control(null, [Validators.required], this.gameValidator.validatorUniqueGameName()),
      plataforma: this.builder.control(null, [Validators.required]),
      sinopse: this.builder.control(null, [Validators.required]),
      imagem: this.builder.control(null, [Validators.required]),
      classificacao: this.builder.control(null),
      developer: this.builder.control(null, [Validators.required])           
    })
  }

  newDeveloper(): void{
    this.isNewDeveloper= !this.isNewDeveloper
    this.initializeNewDeveloperFormGroup()   
  }

  selectDeveloper(): void{
    this.isNewDeveloper= !this.isNewDeveloper
    this.findAllDevelopers()
    this.initializeSelectDeveloperFormGroup()    
  }

  nextStep(): void{
    if(this.isNewDeveloper){
      this.createNewDeveloper(this.developerFormGroup.value)
    }else{
      this.gameFormGroup.controls['developer'].setValue(this.developerFormGroup.value['developer']['_id'])
      this.stepDeveloperLabel=`Developer: ${this.developerFormGroup.value['developer']['nome']}`
    }
  }

    createNewDeveloper(formValueDeveloper: Developer): void{
      this.httpRequest= this.developersService.createNewDeveloper(formValueDeveloper).subscribe(response =>{
        this.gameFormGroup.controls['developer'].setValue(response.body['data']['_id'])
        this.stepDeveloperLabel= `Developer: ${response.body['data']['nome']}`
        this.toastr.showToastrSuccess(`A desenvolvedora ${response.body['data']['nome']} foi adicionada com sucesso`)
      }, err=>{
        this.toastr.showToastrError(`${err.error['message']}`)
      })
    }

    createNewGame(): void{
      this.httpRequest= this.gamesService.createNewGame(this.gameFormGroup.value).subscribe(response => {
        this.toastr.showToastrSuccess(`O game ${response.body['data']['nome']} foi adicionado com sucesso`)
        this.dialogRef.close(true)
      }, err=>{
        this.toastr.showToastrError(`${err.error['message']}`)
        this.dialogRef.close(false)
      })      
    }
    
    closeDialog(): void{
      this.dialogRef.close(false)
    }

    developerNameExists(): boolean{
      return this.developerFormGroup.get('nome').hasError('developerNameAlreadyExists') 
    }
    
    gameNameExists(): boolean{
      return this.gameFormGroup.get('nome').hasError('gameNameAlreadyExists')

    }

    
}
  



