import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {User, UserProfile} from "../../classes/user";
import {FollowersPage, FollowingPage} from "../user-list/user-list";



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
    protected apiSvc: ApiService
  ) {}


  ionViewWillLoad(){
    this.freshenUserProfile();
  }


  freshenUserProfile(){
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading'
    });
    loading.present();
    this.getUserProfile().then((userProfile:UserProfile)=>{
      this.userProfile=userProfile;
      loading.dismiss();
      console.log(this.userProfile);
    });
  }

  getUserProfile():Promise<UserProfile>{
    return this.apiSvc.getUserProfile(this.navParams.get('login'));
  }

  viewFollowers(){
    this.navCtrl.push(FollowersPage);
  }

  viewFollowing(){
    this.navCtrl.push(FollowingPage);
  }
  //  TODO need to fix: following & followers always show mine

}

export class MePage extends UserPage {
  getUserProfile():Promise<UserProfile>{
    return this.apiSvc.getMyProfile();
  }
}
