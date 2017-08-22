import {Component} from "@angular/core";
import {RepoListPage} from "./repo-list";

@Component({
  selector: 'page-starred-repos',
  templateUrl: 'repo-list.html',
})
export class StarredReposPage extends RepoListPage {
  title='Starred Repos';

  getRepos(cursor:string){
    return this.apiSvc.getStarredRepos(this.login,cursor);
  }
}
