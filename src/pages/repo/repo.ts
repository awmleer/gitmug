import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {RepoDetail, RepoParam} from "../../classes/repo";
import {colors} from "../../classes/language-color";
import {WatchersPage} from "../user-list/watchers";
import {StargazersPage} from "../user-list/stargazers";
import {RepoForksPage} from "../repo-list/repo-forks";



@IonicPage()
@Component({
  selector: 'page-repo',
  templateUrl: 'repo.html',
})
export class RepoPage {
  repo:RepoDetail;
  readme:string;
  togglingStar:boolean=false;

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


  freshenRepoDetail():Promise<void>{
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
      repoParam: this.repoParam
    });
  }

  viewForks(){
    this.navCtrl.push(RepoForksPage,{
      repoParam: this.repoParam
    });
  }

  viewWatchers(){
    this.navCtrl.push(WatchersPage,{
      repoParam: this.repoParam
    });
  }

  freshenRepoReadme():Promise<void>{
    return this.apiSvc.getRepoReadme(this.repoParam).then((readme:string)=>{
      this.readme=readme;
    });
  }

  toggleStar(){
    if (this.repo.viewerHasStarred) {
      this.togglingStar=true;
      this.apiSvc.removeStar(this.repo.id).then(() => {
        this.repo.viewerHasStarred=false;
        this.repo.stargazers.totalCount-=1;
        this.togglingStar=false;
      });
    }else{
      this.togglingStar=true;
      this.apiSvc.addStar(this.repo.id).then(() => {
        this.repo.viewerHasStarred=true;
        this.repo.stargazers.totalCount+=1;
        this.togglingStar=false;
      });
    }
  }

}
