import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserListPage } from './user-list';

@NgModule({
  declarations: [
    UserListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserListPage),
  ],
})
export class UserListPageModule {}
