import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms"

import { MatCardModule } from "@angular/material/card"
import { FlexLayoutModule } from "@angular/flex-layout"
import { MatButtonModule } from "@angular/material/button"
import { MatDialogModule } from "@angular/material/dialog"
import { MatStepperModule } from "@angular/material/stepper"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatIconModule } from "@angular/material/icon"


import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { ComponentsModule } from"./../../components/components.module";
import { NewGameComponent } from './new-game/new-game.component';
import { UpdateGameComponent } from './update-game/update-game.component';


@NgModule({
  declarations: [GamesComponent, GameCardComponent, GameDetailComponent, NewGameComponent, UpdateGameComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  
})
export class GamesModule { }
