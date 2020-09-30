import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router"

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  constructor(
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const gameName= this.ActivatedRoute.snapshot.params['gameName']
    
  }

}
