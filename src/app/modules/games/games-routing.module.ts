import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games.component';
import { GameDetailComponent} from './game-detail/game-detail.component'


const routes: Routes = [
  {
    path: '',
    component: GamesComponent
  },
  {
    path:'detail/:gameName',
    component: GameDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
