import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {FollowersPage} from "./followers";
import {FollowingPage} from "./following";
import {StargazersPage} from "./stargazers";
import {WatchersPage} from "./watchers";
import {UserListPage} from "./user-list";

@NgModule({
  declarations: [
    UserListPage,
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
