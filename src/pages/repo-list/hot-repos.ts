import {Component} from "@angular/core";
import {RepoListPage} from "./repo-list";
import {SearchReposPage} from "./search-repos";


@Component({
  selector: 'page-hot-repos',
  templateUrl: 'repo-list.html',
})
export class HotReposPage extends RepoListPage {
  title='Hot Repos';
  showSearchBox=true;

  getRepos(cursor:string){
    return this.apiSvc.getHotRepos();
  }

  doSearch(){
    this.navCtrl.push(SearchReposPage,{
      'searchText': this.searchText
    });
  }
}
