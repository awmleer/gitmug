import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {FollowersPage, FollowingPage, StargazersPage} from './user-list';

@NgModule({
  declarations: [
    FollowersPage,
    FollowingPage,
    StargazersPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowersPage),
    IonicPageModule.forChild(FollowingPage),
    IonicPageModule.forChild(StargazersPage),
  ],
})
export class UserListPageModule {}
