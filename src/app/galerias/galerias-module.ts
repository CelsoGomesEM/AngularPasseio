import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GaleriasRoutingModule } from './galerias-routing-module';
import { GaleriaComponent } from './galeria-component/galeria-component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GaleriaComponent
  ],
  imports: [
    CommonModule,
    GaleriasRoutingModule,
    FormsModule
  ]
})
export class GaleriasModule { }
