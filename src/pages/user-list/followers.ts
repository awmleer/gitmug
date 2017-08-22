import {Component} from "@angular/core";
import {UserListPage} from "./user-list";


@Component({
  selector: 'page-followers',
  templateUrl: 'user-list.html',
})
export class FollowersPage extends UserListPage {
  title='Followers';

  getUsers(cursor:string){
    return this.apiSvc.getFollowers(this.navParams.get('login'),cursor);
  }

}
