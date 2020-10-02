import { Component, OnInit, Input } from '@angular/core';
import { Developer } from "./../../../core/models/developer.model"

@Component({
  selector: 'app-developer-card',
  templateUrl: './developer-card.component.html',
  styleUrls: ['./developer-card.component.css']
})
export class DeveloperCardComponent implements OnInit {

  @Input() Developer: Developer

  constructor() { }

  ngOnInit(): void {
  }

}
