import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AccountService} from "../../services/account.service";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private accountSvc: AccountService,
    private apiSvc: ApiService
  ) {}

  testString:string;

  auth(){
    this.accountSvc.oAuth().then(()=>{
        this.testString=this.apiSvc.getAccessToken();
    }).catch(()=>{
        this.testString='error';
    });
  }

  fetchToken(){
    this.accountSvc.fetchAccessTokenFromStorage().then(()=>{
        this.testString=this.apiSvc.getAccessToken();
    })
  }

  test(){
    this.apiSvc.testQuery();
    this.apiSvc.receivedEvents('awmleer');
  }



}
