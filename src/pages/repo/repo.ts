import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {RepoDetail, RepoParam} from "../../classes/repo";
import {colors} from "../../classes/language-color";
import {StargazersPage, WatchersPage} from "../user-list/user-list";



@IonicPage()
@Component({
  selector: 'page-repo',
  templateUrl: 'repo.html',
})
export class RepoPage {
  repo:RepoDetail;
  readme:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    protected apiSvc: ApiService,
    protected loadingCtrl: LoadingController,
    protected toastSvc: ToastService,
  ) {}

  get languageColor():string{
    let color=colors[this.repo.primaryLanguage.name];
    if (!color) {
      color='#808080';
    }
    return color;
  }

  get markdownBaseUrl():string{
    return `https://github.com/${this.repoParam.owner}/${this.repoParam.name}/raw/master`;
  }

  ionViewDidLoad() {
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading'
    });
    loading.present();
    this.freshenRepoDetail().catch(()=>{
        this.navCtrl.pop();
    }).then(()=>{
      loading.dismiss();
    });
  }

  doRefresh(refresher){
    this.freshenRepoDetail().catch(()=>{
      return;
    }).then(()=>{
      refresher.complete();
    })
  }


  freshenRepoDetail():Promise<null>{
    this.freshenRepoReadme();
    return this.apiSvc.getRepo(this.repoParam.owner,this.repoParam.name).then((repo)=>{
      this.repo=repo;
    }).catch(() => {
      this.toastSvc.toast('Fail to load repo info');
      throw new Error();
    });
  }


  get repoParam():RepoParam{
    return {
      owner:this.navParams.get('ownerLogin'),
      name:this.navParams.get('name')
    };
  }

  viewStargazers(){
    this.navCtrl.push(StargazersPage,{
      repo: this.repoParam
    });
  }

  viewWatchers(){
    this.navCtrl.push(WatchersPage,{
      repo: this.repoParam
    });
  }

  freshenRepoReadme():Promise<null>{
    return this.apiSvc.getRepoReadme(this.repoParam).then((readme:string)=>{
      this.readme=readme;
    });
  }

}
