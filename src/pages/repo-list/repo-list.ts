import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ToastService} from "../../services/toast.service";
import {ApiService} from "../../services/api.service";
import {RepoItem} from "../../classes/repo";
import {PageInfo} from "../../classes/nodes-page";


@IonicPage()
@Component({
  selector: 'page-repo-list',
  templateUrl: 'repo-list.html',
})
abstract class RepoListPage {
  title:string='Repo List';
  totalCount:number;
  pageInfo:PageInfo;
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
    this.apiSvc.getStarredRepos(this.login).then((data)=>{
      this.totalCount=data.totalCount;
      this.pageInfo=data.pageInfo;
      Array.prototype.push.apply(this.repos,data.nodes);
    });
  }


}


export class StarredReposPage extends RepoListPage {

}
