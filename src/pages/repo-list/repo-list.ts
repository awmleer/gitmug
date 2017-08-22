import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ToastService} from "../../services/toast.service";
import {ApiService} from "../../services/api.service";
import {RepoItem} from "../../classes/repo";
import {NodesPage, PageInfo} from "../../classes/nodes-page";
import {RepoPage} from "../repo/repo";


/**
 * This is a base class
 * **/
 @IonicPage()
@Component({
  selector: 'page-repo-list',
  templateUrl: 'repo-list.html',
})
export class RepoListPage {
  title:string='Repo List';
  hideOwnerLogin:boolean=false;
  showSearchBox:boolean=false;
  disableRefresher:boolean=false;

  searchText:string;
  totalCount:number=-1;
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
    this.initRepos().catch(()=>{
      this.navCtrl.pop();
    });
  }

  doRefresh(refresher){
    this.initRepos().catch(()=>{
      return;
    }).then(()=>{
      refresher.complete();
    })
  }


  startLoading(){
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading'
    });
    loading.present();
    return loading;
  }

  initRepos():Promise<null>{
    let loading=this.startLoading();
    this.repos=[];
    this.pageInfo=null;
    this.totalCount=-1;
    return this.appendRepos().then(()=>{
      loading.dismiss();
    }).catch(()=>{
      loading.dismiss();
      this.toastSvc.toast('Fail to load repos');
      throw new Error();
    });
  }

  appendRepos():Promise<null>{
    return this.getRepos(this.pageInfo?this.pageInfo.endCursor:null).then(data=>{
      this.totalCount=data.totalCount;
      this.pageInfo=data.pageInfo;
      Array.prototype.push.apply(this.repos,data.nodes);
      // console.log(this.repos);
    });
  }

  getRepos(cursor:string):Promise<NodesPage<RepoItem>>{
    return Promise.resolve(null);
  }

  viewRepo(repo:RepoItem){
    this.navCtrl.push(RepoPage,{
      'ownerLogin':repo.owner.login,
      'name':repo.name
    });
  }

  doSearch(){}

}

