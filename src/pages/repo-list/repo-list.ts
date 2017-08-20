import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ToastService} from "../../services/toast.service";
import {ApiService} from "../../services/api.service";


@IonicPage()
@Component({
  selector: 'page-repo-list',
  templateUrl: 'repo-list.html',
})
abstract class RepoListPage {
  title:string='Repo List';
  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected apiSvc: ApiService,
    protected loadingCtrl: LoadingController,
    protected toastSvc: ToastService,
  ) {}

  ionViewWillLoad() {

  }


}


export class StarredReposPage extends RepoListPage {

}
