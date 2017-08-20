import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {MePage, UserPage} from './user';

@NgModule({
  declarations: [
    UserPage,
    MePage,
  ],
  imports: [
    IonicPageModule.forChild(UserPage),
    IonicPageModule.forChild(MePage),
  ],
})
export class UserPageModule {}
