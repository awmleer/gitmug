import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {UserProfile} from "../../classes/user";
import {FollowersPage} from "../user-list/user-list";



@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  userProfile:UserProfile;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private apiSvc: ApiService
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
    this.apiSvc.getUserProfile().then(userProfile=>{
      this.userProfile=userProfile;
      console.log(this.userProfile);
      loading.dismiss();
    });
  }

  viewFollowers(){
    this.navCtrl.push(FollowersPage);
  }




}
