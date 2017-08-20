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

  auth(){
    this.accountService.oAuth();
  }

}
