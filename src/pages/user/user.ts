import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {UserProfile} from "../../classes/user";
import {FollowersPage, FollowingPage} from "../user-list/user-list";
import {OwnedReposPage, StarredReposPage} from "../repo-list/repo-list";
import {RepoItem} from "../../classes/repo";
import {RepoPage} from "../repo/repo";
import {ToastService} from "../../services/toast.service";



@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  userProfile:UserProfile;

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected loadingCtrl: LoadingController,
    protected toastSvc: ToastService,
    protected apiSvc: ApiService
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

}



export class MePage extends UserPage {
  getUserProfile():Promise<UserProfile>{
    return this.apiSvc.getMyProfile();
  }

  viewStars(){
    this.navCtrl.push(StarredReposPage,{
      'login':''
    });
  }

  viewRepos(){
    this.navCtrl.push(OwnedReposPage,{
      'login':''
    });
  }

}
