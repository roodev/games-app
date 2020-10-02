import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from "@angular/material/card"
import { FlexLayoutModule } from "@angular/flex-layout"

import { DevelopersRoutingModule } from './developers-routing.module';
import { DevelopersComponent } from './developers.component';
import { DeveloperCardComponent } from './developer-card/developer-card.component';
import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';


@NgModule({
  declarations: [
    DevelopersComponent,
    DeveloperCardComponent,
    DeveloperDetailComponent
  ],
  
  imports: [
    CommonModule,
    DevelopersRoutingModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class DevelopersModule { }
