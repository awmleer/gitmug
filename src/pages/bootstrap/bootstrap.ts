import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import {AccountService} from "../../services/account.service";
import {ToastService} from "../../services/toast.service";


@IonicPage()
@Component({
  selector: 'page-bootstrap',
  templateUrl: 'bootstrap.html',
})
export class BootstrapPage {

  constructor(
    private navCtrl: NavController,
    private accountSvc: AccountService,
    private loadingCtrl: LoadingController,
    private toastSvc: ToastService,
  ) {}


  auth(){
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading'
    });
    loading.present();
    this.accountSvc.oAuth().then(()=>{
      this.navCtrl.pop();
    }).catch(()=>{
      this.toastSvc.toast('Auth failed');
    }).then(()=>{
      loading.dismissAll();
    });
  }

}
