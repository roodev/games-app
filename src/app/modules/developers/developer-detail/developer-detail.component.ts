import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from "@angular/router"
import { Subscription } from "rxjs"
import { DevelopersService} from "./../../../core/services/developers.service"
import { Developer } from "./../../../core/models/developer.model"

@Component({
  selector: 'app-developer-detail',
  templateUrl: './developer-detail.component.html',
  styleUrls: ['./developer-detail.component.css']
})
export class DeveloperDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Developer: Developer

  constructor(
    private activatedRoute: ActivatedRoute,
    private developersService: DevelopersService
  ) { }

  ngOnInit(): void {
    const developerName= this.activatedRoute.snapshot.params['developerName']
      this.findDeveloperByName(developerName)
    
  }

  ngOnDestroy(): void{
    this.httpRequest.unsubscribe()
  }

  findDeveloperByName(developerName: String): void{
    this.httpRequest= this.developersService.findDeveloperByName(developerName).subscribe(response=> {
      this.Developer= response.body['data']

    }, err =>{
      console.log(err)
    })
  }

}
