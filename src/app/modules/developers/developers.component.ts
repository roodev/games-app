import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from "rxjs"
import { Developer } from "./../../core/models/developer.model"
import { DevelopersService} from "./../../core/services/developers.service"
import { MatDialog } from "@angular/material/dialog"
import { NewDeveloperComponent } from "./new-developer/new-developer.component"


@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Developers: Developer[]
  hasError: boolean= false

  constructor( 
    private developersService: DevelopersService ,
    private dialog: MatDialog
  ){ }

  ngOnInit(): void {
    this.findAllDevelopers()
  }

  ngOnDestroy(): void{
    this.httpRequest.unsubscribe()    
  }

  findAllDevelopers(): void{
    this.httpRequest= this.developersService.findAllDevelopers().subscribe(response => {
      this.Developers= response.body['data']      
    }, err=>{
      this.hasError= true
    })
  }

  openNewDeveloperModal(): void{
    const dialogRef= this.dialog.open(NewDeveloperComponent, {
      width: '600px',
      height: '600px',
      disableClose: true
    })


    dialogRef.afterClosed().subscribe(newDeveloperAdded => {
      if(newDeveloperAdded){
        this.Developers= undefined
        this.findAllDevelopers()
      }

    })
  }

}
