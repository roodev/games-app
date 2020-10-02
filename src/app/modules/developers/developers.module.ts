import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms"

import { MatCardModule } from "@angular/material/card"
import { FlexLayoutModule } from "@angular/flex-layout"
import { MatButtonModule } from "@angular/material/button"
import { MatDialogModule } from "@angular/material/dialog"
import { MatStepperModule } from "@angular/material/stepper"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"

import { DevelopersRoutingModule } from './developers-routing.module';
import { DevelopersComponent } from './developers.component';
import { DeveloperCardComponent } from './developer-card/developer-card.component';
import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';
import { ComponentsModule} from "./../../components/components.module";
import { NewDeveloperComponent } from './new-developer/new-developer.component'


@NgModule({
  declarations: [
    DevelopersComponent,
    DeveloperCardComponent,
    DeveloperDetailComponent,
    NewDeveloperComponent
  ],
  
  imports: [
    CommonModule,
    DevelopersRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class DevelopersModule { }
