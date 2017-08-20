import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-repo-list',
  templateUrl: 'repo-list.html',
})
abstract class RepoListPage {
  title:string='Repo List';
  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams
  ) {}

  ionViewWillLoad() {

  }


}


export class StarredReposPage extends RepoListPage {

}
