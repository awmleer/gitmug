import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StarredReposPage} from "./repo-list";

@NgModule({
  declarations: [
    StarredReposPage,
  ],
  imports: [
    IonicPageModule.forChild(StarredReposPage),
  ],
})
export class RepoListPageModule {}
