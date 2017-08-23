import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {UserProfile} from "../../classes/user";
import {FollowersPage} from "../user-list/followers";
import {FollowingPage} from "../user-list/following";
import {RepoItem} from "../../classes/repo";
import {RepoPage} from "../repo/repo";
import {ToastService} from "../../services/toast.service";
import {SettingsPage} from "../settings/settings";
import {UpdateService} from "../../services/update.service";
import {StarredReposPage} from "../repo-list/starred-repos";
import {OwnedReposPage} from "../repo-list/owned-repos";


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  showSettingsButton:boolean=false;

  userProfile:UserProfile;
  togglingFollow:boolean=false;

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected loadingCtrl: LoadingController,
    protected toastSvc: ToastService,
    public updateSvc: UpdateService,
    protected apiSvc: ApiService,
  ) {}


  ionViewWillLoad(){
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading'
    });
    loading.present();
    this.freshenUserProfile().catch(()=>{
      this.navCtrl.pop();
    }).then(()=>{
      loading.dismiss();
    });
  }

  doRefresh(refresher){
    this.freshenUserProfile().catch(()=>{
      return;
    }).then(()=>{
      refresher.complete();
    })
  }

  freshenUserProfile():Promise<null>{
    return this.getUserProfile().then((userProfile:UserProfile)=>{
      this.userProfile=userProfile;
    }).catch(() => {
      this.toastSvc.toast('Fail to load user profile');
      throw new Error();
    });
  }

  getUserProfile():Promise<UserProfile>{
    return this.apiSvc.getUserProfile(this.navParams.get('login'));
  }

  viewFollowers(){
    this.navCtrl.push(FollowersPage,{
      'login':this.userProfile.login
    });
  }

  viewFollowing(){
    this.navCtrl.push(FollowingPage,{
      'login':this.userProfile.login
    });
  }

  viewStars(){
    this.navCtrl.push(StarredReposPage,{
      'login':this.userProfile.login
    });
  }

  viewRepos(){
    this.navCtrl.push(OwnedReposPage,{
      'login':this.userProfile.login
    });
  }

  viewRepo(repo:RepoItem){
    this.navCtrl.push(RepoPage,{
      'ownerLogin':repo.owner.login,
      'name':repo.name
    });
  }

  goSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  toggleFollow(){
    if (this.userProfile.viewerIsFollowing) {
      this.togglingFollow=true;
      this.apiSvc.unfollowUser(this.userProfile.login).then(() => {
        this.userProfile.viewerIsFollowing=false;
        this.userProfile.followers.totalCount-=1;
        this.togglingFollow=false;
      });
    }else{
      this.togglingFollow=true;
      this.apiSvc.followUser(this.userProfile.login).then(() => {
        this.userProfile.viewerIsFollowing=true;
        this.userProfile.followers.totalCount+=1;
        this.togglingFollow=false;
      });
    }
  }

}

