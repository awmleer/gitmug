import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiService} from "../../services/api.service";


@IonicPage()
@Component({
  selector: 'page-content-list',
  templateUrl: 'content-list.html',
})
export class ContentListPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiSvc: ApiService,
  ) {}

}
