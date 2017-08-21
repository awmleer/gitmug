import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {MePage} from "../user/user";
import {HotReposPage} from "../repo-list/repo-list";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HotReposPage;
  tab3Root = MePage;

  constructor() {

  }
}
