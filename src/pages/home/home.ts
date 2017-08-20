import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private accountService: AccountService
  ) {}

  testString:string;

  auth(){
    this.accountService.oAuth().then(()=>{
        this.testString=this.accountService.accessToken;
    }).catch(()=>{
        this.testString='error';
    });
  }



}
