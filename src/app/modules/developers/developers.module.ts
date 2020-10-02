import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from "@angular/material/card"

import { DevelopersRoutingModule } from './developers-routing.module';
import { DevelopersComponent } from './developers.component';


@NgModule({
  declarations: [DevelopersComponent],
  imports: [
    CommonModule,
    DevelopersRoutingModule,
    MatCardModule
  ]
})
export class DevelopersModule { }
