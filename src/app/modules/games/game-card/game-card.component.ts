import { Component, OnInit, Input } from '@angular/core';
import { Game } from "./../../../core/models/game.model"

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {

  @Input() Game: Game

  constructor() { }

  ngOnInit(): void {
  }

  sliceSnyposis(value: String): String{
    return `${value.slice(0, 100)}...`
  }
  

}
