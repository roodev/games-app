import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from "@angular/material/card"
import { FlexLayoutModule } from "@angular/flex-layout"

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { GameCardComponent } from './game-card/game-card.component';


@NgModule({
  declarations: [GamesComponent, GameCardComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class GamesModule { }
