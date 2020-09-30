import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from "@angular/material/card"

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';


@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatCardModule
  ]
})
export class GamesModule { }
