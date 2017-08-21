import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {FollowersPage, FollowingPage, StargazersPage, WatchersPage} from './user-list';

@NgModule({
  declarations: [
    FollowersPage,
    FollowingPage,
    StargazersPage,
    WatchersPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowersPage),
    IonicPageModule.forChild(FollowingPage),
    IonicPageModule.forChild(StargazersPage),
    IonicPageModule.forChild(WatchersPage),
  ],
})
export class UserListPageModule {}
