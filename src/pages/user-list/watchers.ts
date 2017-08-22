import {Component} from "@angular/core";
import {UserListPage} from "./user-list";

@Component({
  selector: 'page-watchers',
  templateUrl: 'user-list.html',
})
export class WatchersPage extends UserListPage {
  title='Watchers';
  getUsers(cursor:string){
    return this.apiSvc.getWatchers(this.navParams.get('repoParam'),cursor); // repo:{owner:string;name:string;}
  }
}
