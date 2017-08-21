import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiService} from "../../services/api.service";



@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected apiSvc: ApiService,
  ) {}

}
