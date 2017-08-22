import {Component} from "@angular/core";
import {RepoListPage} from "./repo-list";


@Component({
  selector: 'page-owned-repos',
  templateUrl: 'repo-list.html',
})
export class OwnedReposPage extends RepoListPage {
  title='Owned Repos';
  hideOwnerLogin=true;

  getRepos(cursor:string){
    return this.apiSvc.getOwnedRepos(this.login,cursor);
  }
}
