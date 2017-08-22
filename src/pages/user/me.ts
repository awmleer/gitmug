import {Component} from "@angular/core";
import {UserPage} from "./user";
import {UserProfile} from "../../classes/user";
import {StarredReposPage} from "../repo-list/starred-repos";
import {OwnedReposPage} from "../repo-list/owned-repos";


@Component({
  selector: 'page-me',
  templateUrl: 'user.html',
})
export class MePage extends UserPage {
  showSettingsButton=true;

  getUserProfile():Promise<UserProfile>{
    return this.apiSvc.getMyProfile();
  }

  viewStars(){
    this.navCtrl.push(StarredReposPage,{
      'login':''
    });
  }

  viewRepos(){
    this.navCtrl.push(OwnedReposPage,{
      'login':''
    });
  }

}
