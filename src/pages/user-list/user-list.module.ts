import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {FollowersPage} from './user-list';

@NgModule({
  declarations: [
    FollowersPage
  ],
  imports: [
    IonicPageModule.forChild(FollowersPage),
  ],
})
export class UserListPageModule {}
