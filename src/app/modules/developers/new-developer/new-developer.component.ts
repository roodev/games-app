import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"
import { MatDialogRef } from '@angular/material/dialog'
import { Subscription } from "rxjs"
import { Developer } from './../../../core/models/developer.model'
import { DevelopersService } from './../../../core/services/developers.service'
import { MyToastrService } from './../../../core/services/toastr.service'
import { DeveloperValidator } from './../../../core/validators/developer.validator'


@Component({
  selector: 'app-new-developer',
  templateUrl: './new-developer.component.html',
  styleUrls: ['./new-developer.component.css']
})
export class NewDeveloperComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  developerFormGroup: FormGroup
  developers: Developer[]
  stepDeveloperLabel: String= 'Developer'

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private developersService: DevelopersService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private developerValidator: DeveloperValidator,
    private dialogRef: MatDialogRef<NewDeveloperComponent>
  ) { }

  ngOnInit(): void {
    this.initializeNewDeveloperFormGroup()
  }


  ngOnDestroy(): void{
    if (this.httpRequest){
      this.httpRequest.unsubscribe()
    }
  }

  
  createNewDeveloper(): void{
    this.httpRequest= this.developersService.createNewDeveloper(this.developerFormGroup.value).subscribe(response =>{
      this.stepDeveloperLabel= `Developer: ${response.body['data']['nome']}`
      this.toastr.showToastrSuccess(`A desenvolvedora ${response.body['data']['nome']} foi adicionada com sucesso`)
      this.dialogRef.close(true)
    }, err=>{
      this.toastr.showToastrError(`${err.error['message']}`)
      this.dialogRef.close(false)
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

closeDialog(): void{
  this.dialogRef.close(false)

}

developerNameExists(): boolean{
  return this.developerFormGroup.get('nome').hasError('developerNameAlreadyExists')
}
}
