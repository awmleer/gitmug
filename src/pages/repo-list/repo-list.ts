import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ToastService} from "../../services/toast.service";
import {ApiService} from "../../services/api.service";
import {RepoItem} from "../../classes/repo";


@IonicPage()
@Component({
  selector: 'page-repo-list',
  templateUrl: 'repo-list.html',
})
abstract class RepoListPage {
  title:string='Repo List';
  repos:RepoItem[]=[];
  login:string;

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected apiSvc: ApiService,
    protected loadingCtrl: LoadingController,
    protected toastSvc: ToastService,
  ) {
    this.login=navParams.get('login');
  }

  ionViewWillLoad() {
    this.apiSvc.getStarredRepos(this.login).then((repos)=>{
        Array.prototype.push.apply(this.repos,repos);
    });
  }


}


export class StarredReposPage extends RepoListPage {

}
