import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HotReposPage, OwnedReposPage, SearchReposPage, StarredReposPage} from "./repo-list";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    StarredReposPage,
    OwnedReposPage,
    HotReposPage,
    SearchReposPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(StarredReposPage),
    IonicPageModule.forChild(OwnedReposPage),
    IonicPageModule.forChild(HotReposPage),
    IonicPageModule.forChild(SearchReposPage),
  ],
})
export class RepoListPageModule {}
