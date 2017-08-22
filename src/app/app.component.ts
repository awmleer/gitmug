import { Component } from '@angular/core';
import {ModalController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {AccountService} from "../services/account.service";
import {BootstrapPage} from "../pages/bootstrap/bootstrap";
import {UpdateService} from "../services/update.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    accountSvc: AccountService,
    updateSvc: UpdateService,
    modalCtrl: ModalController,
    splashScreen: SplashScreen,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      accountSvc.fetchUserDataFromStorage().then(()=>{
        if (accountSvc.user.accessToken) {
          splashScreen.hide();
          accountSvc.freshUser();
        }else {
          modalCtrl.create(BootstrapPage,{},{
            enableBackdropDismiss:false,
            showBackdrop:false
          }).present().then(()=>{
            splashScreen.hide();
          });
        }
      });

      setTimeout(()=>{
        updateSvc.checkUpdate();
      },3000);

    });
  }
}
