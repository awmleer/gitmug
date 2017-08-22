import { Component } from '@angular/core';
import {DashboardPage} from "../dashboard/dashboard";
import {MePage} from "../user/me";
import {HotReposPage} from "../repo-list/hot-repos";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DashboardPage;
  tab2Root = HotReposPage;
  tab3Root = MePage;

  constructor() {}

}
