import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ToastService} from "../../services/toast.service";
import {ApiService} from "../../services/api.service";
import {RepoItem} from "../../classes/repo";
import {NodesPage, PageInfo} from "../../classes/nodes-page";


@IonicPage()
@Component({
  selector: 'page-repo-list',
  templateUrl: 'repo-list.html',
})
abstract class RepoListPage {
  title:string='Repo List';
  showOwnerLogin:boolean=false;
  showSearchBox:boolean=false;

  searchText:string;
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
    this.searchText=navParams.get('searchText')||'';
  }

  ionViewWillLoad() {
    this.initRepos();
  }

  initRepos(){
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading'
    });
    loading.present();
    this.appendRepos().then(()=>{
      loading.dismiss();
    }).catch(()=>{
      this.navCtrl.pop();
      loading.dismiss().then(()=>{
        this.toastSvc.toast('Fail to load repos');
      });
    });
  }

  appendRepos():Promise<null>{
    return this.getRepos(this.pageInfo?this.pageInfo.endCursor:null).then(data=>{
      this.totalCount=data.totalCount;
      this.pageInfo=data.pageInfo;
      Array.prototype.push.apply(this.repos,data.nodes);
      console.log(this.repos);
    });
  }

  abstract getRepos(cursor:string):Promise<NodesPage<RepoItem>>;

  viewRepo(repo:RepoItem){

  }

  doSearch(){
    //TODO
  }

}


export class StarredReposPage extends RepoListPage {
  title='Starred Repos';
  showOwnerLogin=true;

  getRepos(cursor:string){
    return this.apiSvc.getStarredRepos(this.login,cursor);
  }
}


export class OwnedReposPage extends RepoListPage {
  title='Owned Repos';

  getRepos(cursor:string){
    return this.apiSvc.getOwnedRepos(this.login,cursor);
  }
}

export class HotReposPage extends RepoListPage {
  title='Hot Repos';
  showSearchBox=true;
  showOwnerLogin=true;

  getRepos(cursor:string){
    return this.apiSvc.getHotRepos();
  }

  doSearch(){
    //TODO push search page
  }
}
