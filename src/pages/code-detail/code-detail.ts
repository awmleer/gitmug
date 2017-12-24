import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RepoParam} from "../../classes/repo";
import {ApiService} from "../../services/api.service";
import * as highlight from 'highlightjs';


@IonicPage()
@Component({
  selector: 'page-code-detail',
  templateUrl: 'code-detail.html',
})
export class CodeDetailPage {

  content:string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private apiSvc: ApiService,
  ) {}

  ionViewWillLoad(){
    //TODO add loading
    this.apiSvc.getFileContent(this.repoParam, this.path).then((content:string) => {
      this.content=highlight.highlightAuto(content).value.replace(/\n/g,'<br>');
    });
  }

  get repoParam():RepoParam{
    return this.navParams.get('repoParam');
  }

  get path():string{
    return this.navParams.get('path');
  }

}
