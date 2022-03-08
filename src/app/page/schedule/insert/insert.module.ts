import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertPageRoutingModule } from './insert-routing.module';

import { InsertPage } from './insert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [InsertPage],
})
export class InsertPageModule {}
