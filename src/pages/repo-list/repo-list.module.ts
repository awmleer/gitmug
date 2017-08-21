import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HotReposPage, OwnedReposPage, StarredReposPage} from "./repo-list";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    StarredReposPage,
    OwnedReposPage,
    HotReposPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(StarredReposPage),
    IonicPageModule.forChild(OwnedReposPage),
    IonicPageModule.forChild(HotReposPage),
  ],
})
export class RepoListPageModule {}
