import {Component} from "@angular/core";
import {UserListPage} from "./user-list";


@Component({
  selector: 'page-stargazers',
  templateUrl: 'user-list.html',
})
export class StargazersPage extends UserListPage {
  title='Stargazers';
  getUsers(cursor:string){
    return this.apiSvc.getStargazers(this.navParams.get('repoParam'),cursor); // repo:{owner:string;name:string;}
  }
}
