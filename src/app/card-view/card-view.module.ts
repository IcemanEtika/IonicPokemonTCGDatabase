import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardViewPageRoutingModule } from './card-view-routing.module';

import { CardViewPage } from './card-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardViewPageRoutingModule
  ],
  declarations: [CardViewPage]
})
export class CardViewPageModule {}
