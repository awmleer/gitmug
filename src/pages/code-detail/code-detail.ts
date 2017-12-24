import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {RepoParam} from "../../classes/repo";
import {ApiService} from "../../services/api.service";
import * as highlight from 'highlightjs';
import {ToastService} from "../../services/toast.service";


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
    private loadingCtrl: LoadingController,
    private toastSvc: ToastService,
  ) {}

  ionViewWillLoad(){
    let loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading'
    });
    loading.present();
    this.apiSvc.getFileContent(this.repoParam, this.path).then((content:string) => {
      this.content=highlight.highlightAuto(content).value.replace(/\n/g,'<br>');
      loading.dismiss();
    }).catch(()=>{
      this.navCtrl.pop();
      loading.dismiss().then(()=>{
        this.toastSvc.toast('Fail to load file list');
      });
    });
  }

  get repoParam():RepoParam{
    return this.navParams.get('repoParam');
  }

  get path():string{
    return this.navParams.get('path');
  }

}
