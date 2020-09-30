import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from "@angular/material/card"
import { FlexLayoutModule } from "@angular/flex-layout"

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { ComponentsModule } from"./../../components/components.module";


@NgModule({
  declarations: [GamesComponent, GameCardComponent, GameDetailComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    ComponentsModule
  ]
})
export class GamesModule { }
