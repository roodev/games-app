import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"
import { Subscription } from "rxjs"
import { Developer } from "./../../../core/models/developer.model"
import { DevelopersService } from "./../../../core/services/developers.service"
import { MyToastrService } from "./../../../core/services/toastr.service"

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

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private developersService: DevelopersService,
    private builder: FormBuilder,
    private toastr: MyToastrService
  ) { }

  ngOnInit(): void {
    this.findAllDevelopers()
    this.initializeSelectDeveloperFormGroup()
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
      nome: this.builder.control(null, [Validators.required]),
      imagem: this.builder.control(null),
      biografia: this.builder.control(null)
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
      this.creatNewDeveloper(this.developerFormGroup.value)
    }else{
      //definir o Id no formulário de fame
      this.stepDeveloperLabel=`Developer: ${this.developerFormGroup.value['developer']['nome']}`
    }
  }

    creatNewDeveloper(formValueDeveloper: Developer): void{
      this.httpRequest= this.developersService.createNewDeveloper(formValueDeveloper).subscribe(response =>{
        //Definir o ID no formulário de filme
        this.stepDeveloperLabel= `Developer: ${response.body['data']['nome']}`
        this.toastr.showToastrSuccess(`A desenvolvedora ${response.body['data']['nome']} foi adicionada com sucesso`)
      }, err=>{
        this.toastr.showToastrError(`${err.error['message']}`)
      })
    }
}
  



