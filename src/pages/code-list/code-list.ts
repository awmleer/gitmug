import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {RepoParam} from "../../classes/repo";
import {Content} from "../../classes/content";
import {CodeDetailPage} from "../code-detail/code-detail";
import {ToastService} from "../../services/toast.service";


@IonicPage()
@Component({
  selector: 'page-code-list',
  templateUrl: 'code-list.html',
})
export class CodeListPage {

  contents:Content[];

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
    this.apiSvc.getContents(this.repoParam, this.path).then((contents:Content[]) => {
      this.contents=contents;
      loading.dismiss();
    }).catch(()=>{
      this.navCtrl.pop();
      loading.dismiss().then(()=>{
        this.toastSvc.toast('Fail to load file list');
      });
    });;
  }

  get repoParam():RepoParam{
    return this.navParams.get('repoParam');
  }

  get path():string{
    return this.navParams.get('path');
  }

  viewDir(path:string){
    this.navCtrl.push(CodeListPage,{
      repoParam: this.repoParam,
      path: path
    });
  }

  viewFile(path:string){
    this.navCtrl.push(CodeDetailPage,{
      repoParam: this.repoParam,
      path: path
    });
  }


}
