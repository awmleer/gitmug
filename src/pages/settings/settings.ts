import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CONST} from "../../app/const";
import {InAppBrowser} from "@ionic-native/in-app-browser";



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  version=CONST.version;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private inAppBrowser: InAppBrowser,
  ) {}

  openGitHubLink(){
    this.inAppBrowser.create('https://github.com/awmleer/GitPub','_system');
  }



}
