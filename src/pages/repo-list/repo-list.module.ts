import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {OwnedReposPage, StarredReposPage} from "./repo-list";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    StarredReposPage,
    OwnedReposPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(StarredReposPage),
    IonicPageModule.forChild(OwnedReposPage),
  ],
})
export class RepoListPageModule {}
