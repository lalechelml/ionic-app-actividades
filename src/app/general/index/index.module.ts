import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';
import { HeaderComponent } from 'src/app/template/header/header.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, IndexPageRoutingModule],
  declarations: [IndexPage, HeaderComponent],
})
export class IndexPageModule {}
