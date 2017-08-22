import {Component} from "@angular/core";
import {RepoListPage} from "./repo-list";


@Component({
  selector: 'page-repo-forks',
  templateUrl: 'repo-list.html',
})
export class RepoForksPage extends RepoListPage {
  title='Forks';

  getRepos(cursor:string){
    return this.apiSvc.getRepoForks(this.navParams.get('repoParam'),cursor);
  }
}
