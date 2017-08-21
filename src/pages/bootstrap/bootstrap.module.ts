import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BootstrapPage } from './bootstrap';

@NgModule({
  declarations: [
    BootstrapPage,
  ],
  imports: [
    IonicPageModule.forChild(BootstrapPage),
  ],
})
export class BootstrapPageModule {}
