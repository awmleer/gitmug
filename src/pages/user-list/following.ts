import {Component} from "@angular/core";
import {UserListPage} from "./user-list";

@Component({
  selector: 'page-following',
  templateUrl: 'user-list.html',
})
export class FollowingPage extends UserListPage {
  title='Following';

  getUsers(cursor:string){
    return this.apiSvc.getFollowing(this.navParams.get('login'),cursor);
  }

}
