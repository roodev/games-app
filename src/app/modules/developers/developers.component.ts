import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, Subscription} from "rxjs"
import { Developer } from "./../../core/models/developer.model"
import { DevelopersService} from "./../../core/services/developers.service"


@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Developers: Developer

  constructor( 
    private developersService: DevelopersService 
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
      console.log(this.Developers)
    }, err=>{
      console.log(err)
    })
  }

}
