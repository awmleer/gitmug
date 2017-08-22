import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {AccountService} from "../../services/account.service";
import {UserPage} from "../user/user";
import {RepoPage} from "../repo/repo";



@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  events=[];

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected accountSvc: AccountService,
    protected apiSvc: ApiService,
  ) {}

  doRefresh(refresher){
    this.freshenEvents().catch(()=>{
      return;
    }).then(()=>{
      refresher.complete();
    })
  }

  eventIcon(eventType:string):string{
    switch (eventType){
      case 'WatchEvent': return 'md-star';
      case 'PushEvent': return 'md-git-commit';
      case 'ForkEvent': return 'md-git-network';
      case 'IssuesEvent': return 'md-alert';
      case 'IssueCommentEvent': return 'md-chatboxes';
      case 'PullRequestEvent': return 'md-git-pull-request';
      default: return 'md-notifications';
    }
  }

  eventVerb(event):string{
    switch (event.type){
      case 'WatchEvent': return 'starred';
      case 'PushEvent': return 'pushed to';
      case 'ForkEvent': return 'forked';
      case 'IssuesEvent': return `${event.payload.action} issue #${event.payload.issue.number} in`;
      case 'IssueCommentEvent': return `commented on issue #${event.payload.issue.number} in`;
      case 'PullRequestEvent': return `${event.payload.action} a pull request in`;
      default: return '...';
    }
  }

  ionViewDidLoad(){
    this.freshenEvents();
    this.accountSvc.userUpdated.subscribe(() => {
      this.freshenEvents();
    });
  }

  freshenEvents():Promise<null>{
    if (this.accountSvc.user.login) {
      return this.apiSvc.getReceivedEvents(this.accountSvc.user.login).then(events=>{
        this.events=events;
        // console.log(this.events);
      });
    }else{
      return Promise.resolve();
    }
  }


  viewRepo(repoString:string){
    let t=repoString.split('/');
    this.navCtrl.push(RepoPage,{
      'ownerLogin':t[0],
      'name':t[1]
    });
  }

  viewUser(login:string){
    this.navCtrl.push(UserPage,{
      'login':login
    });
  }



}
