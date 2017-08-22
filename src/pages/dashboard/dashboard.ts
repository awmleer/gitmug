import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {AccountService} from "../../services/account.service";



@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  events=[];
  // dirty:boolean=false;

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected accountSvc: AccountService,
    protected apiSvc: ApiService,
  ) {}

  ionViewDidLoad(){
    this.freshenEvents();
    this.accountSvc.userUpdated.subscribe(() => {
      this.freshenEvents();
    });
  }

  // ionViewWillEnter(){
  //   if(!this.dirty){
  //     this.ionViewDidLoad();
  //   }
  // }

  freshenEvents():Promise<null>{
    if (this.accountSvc.user.login) {
      // this.oldUserLogin=this.accountSvc.user.login;
      return this.apiSvc.getReceivedEvents(this.accountSvc.user.login).then(events=>{
        this.events=events;
        console.log(this.events);
      });
    }else{
      return Promise.resolve();
    }
  }



}
