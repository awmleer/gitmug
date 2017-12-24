import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {RepoParam} from "../../classes/repo";
import {Content} from "../../classes/content";
import {CodeDetailPage} from "../code-detail/code-detail";


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
  ) {}

  ionViewWillLoad(){
    //TODO add loading
    this.apiSvc.getContents(this.repoParam, this.path).then((contents:Content[]) => {
      console.log(contents);
      this.contents=contents;
    })
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
