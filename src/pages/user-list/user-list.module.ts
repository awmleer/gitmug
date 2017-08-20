import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {FollowersPage, FollowingPage} from './user-list';

@NgModule({
  declarations: [
    FollowersPage,
    FollowingPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowersPage),
    IonicPageModule.forChild(FollowingPage),
  ],
})
export class UserListPageModule {}
