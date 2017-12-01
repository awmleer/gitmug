import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {UserItem} from "../../classes/user";
import {NodesPage, PageInfo} from "../../classes/nodes-page";
import {ToastService} from "../../services/toast.service";
import {UserPage} from "../user/user";


/**
 * This is a base class
 * **/
@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
  title='User List';
  users:UserItem[]=[];
  totalCount:number=-1;
  pageInfo:PageInfo;

  constructor(
    protected navCtrl: NavController,
    protected apiSvc: ApiService,
    protected toastSvc: ToastService,
    public navParams: NavParams,
    protected loadingCtrl: LoadingController
  ) {}

  ionViewWillLoad(){
    this.initUsers();
  }

  doRefresh(refresher){
    this.initUsers().catch(()=>{
      return;
    }).then(()=>{
      refresher.complete();
    })
  }


  initUsers():Promise<void>{
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading'
    });
    loading.present();
    this.users=[];
    this.pageInfo=null;
    this.totalCount=-1;
    return this.appendUsers().then(()=>{
      loading.dismiss();
    }).catch(()=>{
      this.navCtrl.pop();
      loading.dismiss().then(()=>{
        this.toastSvc.toast('Fail to load users');
      });
    });
  }

  appendUsers():Promise<void>{
    return this.getUsers(this.pageInfo?this.pageInfo.endCursor:null).then(data=>{
      this.totalCount=data.totalCount;
      this.pageInfo=data.pageInfo;
      Array.prototype.push.apply(this.users,data.nodes);
      // console.log(this.users);
    });
  }

  getUsers(cursor:string):Promise<NodesPage<UserItem>>{
    return Promise.resolve(null);
  }

  viewUser(user:UserItem){
    this.navCtrl.push(UserPage,{
      'login':user.login
    });
  }

}
