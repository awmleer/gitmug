import {Component} from "@angular/core";
import {RepoListPage} from "./repo-list";


@Component({
  selector: 'page-search-repos',
  templateUrl: 'repo-list.html',
})
export class SearchReposPage extends RepoListPage {
  title='Search Repos';
  showSearchBox=true;
  disableRefresher=true;

  getRepos(){
    return this.apiSvc.searchRepos(this.searchText);
  }

  initRepos(){
    let loading=this.startLoading();
    this.repos=[];
    this.totalCount=0;
    return this.appendRepos().then(()=>{
      loading.dismiss();
    }).catch(()=>{
      loading.dismiss();
      this.toastSvc.toast('Search failed');
      throw new Error();
    });
  }

  doSearch(){
    this.initRepos().catch(()=>{});
  }

}
