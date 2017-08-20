import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
  title:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewWillLoad(){
    this.title=this.navParams.get('title') || 'User List';
  }

}
