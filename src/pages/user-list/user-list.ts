import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {UserItem} from "../../classes/user";
import {PageInfo} from "../../classes/page-info";



@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
  title='User List';
  users:UserItem[]=[];
  totalCount:number;
  pageInfo:PageInfo;

  constructor(
    protected navCtrl: NavController,
    protected apiSvc: ApiService,
    // public navParams: NavParams,
    protected loadingCtrl: LoadingController
  ) {}

  ionViewWillLoad(){
    this.loadUserList();
  }

  loadUserList(){
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading'
    });
    loading.present();
    this.loadUserListData().then(()=>{
      loading.dismiss();
    });
  }

  loadUserListData():Promise<null>{
    return Promise.reject(null);
  }

}


export class FollowersPage extends UserListPage {
  title='Followers';

  loadUserListData():Promise<null>{
    return this.apiSvc.getFollowers().then(data=>{
      this.totalCount=data.totalCount;
      this.pageInfo=data.pageInfo;
      this.users=data.nodes;
      console.log(this.users);
    });
  }

}

