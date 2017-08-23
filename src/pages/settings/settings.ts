import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {CONST} from "../../app/const";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {UpdateService} from "../../services/update.service";



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
    private platform: Platform,
    private alertCtrl: AlertController,
    private inAppBrowser: InAppBrowser,
    public updateSvc: UpdateService,
  ) {}

  openGitHubLink(){
    this.inAppBrowser.create('https://github.com/awmleer/GitMug','_system');
  }

  update(){
    if (this.platform.is('android')) {
      this.inAppBrowser.create(this.updateSvc.androidDownloadLink,'_system');
    }else{
      this.alertCtrl.create({
        title: 'Update',
        subTitle: 'Please update in App Store',
        buttons: ['OK']
      }).present();
    }
  }



}
