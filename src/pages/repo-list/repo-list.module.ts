import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {OwnedReposPage, StarredReposPage} from "./repo-list";

@NgModule({
  declarations: [
    StarredReposPage,
    OwnedReposPage,
  ],
  imports: [
    IonicPageModule.forChild(StarredReposPage),
    IonicPageModule.forChild(OwnedReposPage),
  ],
})
export class RepoListPageModule {}
