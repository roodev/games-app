import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevelopersComponent } from './developers.component'
import { DeveloperDetailComponent } from "./developer-detail/developer-detail.component"


const routes: Routes = [
  {
    path: '',
    component: DevelopersComponent
  },
  {
    path: 'detail/:developerName',
    component: DeveloperDetailComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopersRoutingModule { }
