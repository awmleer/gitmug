import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ComponentsModule} from "../../components/components.module";
import {StarredReposPage} from "./starred-repos";
import {OwnedReposPage} from "./owned-repos";
import {HotReposPage} from "./hot-repos";
import {RepoForksPage} from "./repo-forks";
import {SearchReposPage} from "./search-repos";
import {RepoListPage} from "./repo-list";

@NgModule({
  declarations: [
    RepoListPage,
    StarredReposPage,
    OwnedReposPage,
    RepoForksPage,
    HotReposPage,
    SearchReposPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(StarredReposPage),
    IonicPageModule.forChild(OwnedReposPage),
    IonicPageModule.forChild(RepoForksPage),
    IonicPageModule.forChild(HotReposPage),
    IonicPageModule.forChild(SearchReposPage),
  ],
})
export class RepoListPageModule {}
