import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {UserItem} from "../../classes/user";
import {NodesPage, PageInfo} from "../../classes/nodes-page";
import {ToastService} from "../../services/toast.service";
import {UserPage} from "../user/user";



@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export abstract class UserListPage {
  title='User List';
  users:UserItem[]=[];
  totalCount:number;
  pageInfo:PageInfo;

  constructor(
    protected navCtrl: NavController,
    protected apiSvc: ApiService,
    protected toastSvc: ToastService,
    // public navParams: NavParams,
    protected loadingCtrl: LoadingController
  ) {}

  ionViewWillLoad(){
    this.initUsers();
  }

  initUsers(){
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading'
    });
    loading.present();
    this.appendUsers().then(()=>{
      loading.dismiss();
    }).catch(()=>{
      this.navCtrl.pop();
      loading.dismiss().then(()=>{
        this.toastSvc.toast('Fail to load users');
      });
    });
  }

  appendUsers():Promise<null>{
    return this.getUsers().then(data=>{
      this.totalCount=data.totalCount;
      this.pageInfo=data.pageInfo;
      Array.prototype.push.apply(this.users,data.nodes);
      console.log(this.users);
    });
  }

  abstract getUsers():Promise<NodesPage<UserItem>>;

  viewUser(user:UserItem){
    this.navCtrl.push(UserPage,{
      'login':user.login
    });
  }

}


export class FollowersPage extends UserListPage {
  title='Followers';

  getUsers(){
    return this.apiSvc.getFollowers();
  }

}

export class FollowingPage extends UserListPage {
  title='Following';

  getUsers(){
    return this.apiSvc.getFollowing();
  }

}

