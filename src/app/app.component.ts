import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {AccountService} from "../services/account.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    accountSvc: AccountService,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      accountSvc.fetchAccessTokenFromStorage().then(()=>{
        accountSvc.freshUser().then(()=>{
          splashScreen.hide();
        }).catch(()=>{
          //TODO show login page
          splashScreen.hide();
        });
      });
    });
  }
}
