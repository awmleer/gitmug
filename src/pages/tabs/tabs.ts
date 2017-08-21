import { Component } from '@angular/core';

import {MePage} from "../user/user";
import {HotReposPage} from "../repo-list/repo-list";
import {DashboardPage} from "../dashboard/dashboard";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DashboardPage;
  tab2Root = HotReposPage;
  tab3Root = MePage;

  constructor() {

  }
}
