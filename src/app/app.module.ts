import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {AccountService} from "../services/account.service";
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";
import {ApiService} from "../services/api.service";
import {UserPageModule} from "../pages/user/user.module";
import {UserListPageModule} from "../pages/user-list/user-list.module";
import {ToastService} from "../services/toast.service";
import {RepoListPageModule} from "../pages/repo-list/repo-list.module";
import {RepoPageModule} from "../pages/repo/repo.module";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    UserPageModule,
    UserListPageModule,
    RepoListPageModule,
    RepoPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AboutPage,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    ToastService,
    ApiService,
    AccountService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
