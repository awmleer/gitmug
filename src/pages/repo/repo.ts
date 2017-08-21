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
  ownerLogin:string;
  name:string;
  repo:RepoDetail;
  readme:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    protected apiSvc: ApiService,
    protected loadingCtrl: LoadingController,
    protected toastSvc: ToastService,
  ) {
    this.ownerLogin=navParams.get('ownerLogin');
    this.name=navParams.get('name');
  }

  get languageColor():string{
    let color=colors[this.repo.primaryLanguage.name];
    if (!color) {
      color='#808080';
    }
    return color;
  }

  get markdownBaseUrl():string{
    return `https://github.com/${this.repo.owner.login}/${this.repo.name}/raw/master`;
  }

  ionViewDidLoad() {
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading'
    });
    loading.present();
    this.freshenRepoDetail().catch(()=>{
        this.navCtrl.pop();
        this.toastSvc.toast('Fail to load repo info');
    }).then(()=>{
      this.freshenRepoReadme();
      loading.dismiss();
    });
  }

  freshenRepoDetail():Promise<null>{
    return this.apiSvc.getRepo(this.ownerLogin,this.name).then((repo)=>{
      this.repo=repo;
    });
  }


  get repoParam():RepoParam{
    return {
      owner:this.repo.owner.login,
      name:this.repo.name
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
