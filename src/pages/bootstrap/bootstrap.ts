import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-bootstrap',
  templateUrl: 'bootstrap.html',
})
export class BootstrapPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BootstrapPage');
  }

}
